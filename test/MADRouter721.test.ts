import {
  SignTypedDataVersion,
  signTypedData
} from "@metamask/eth-sig-util";
import "@nomicfoundation/hardhat-chai-matchers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Wallet } from "ethers";
import { artifacts, ethers, network } from "hardhat";

import {
  MADFactory721,
  MADMarketplace721,
  MADRouter721,
  MockERC20,
} from "../src/types";
import { BasicErrors, LazyErrors, MinimalErrors, RouterErrors, WhitelistErrors } from "./utils/errors";
import { getSignerAddrs } from "./utils/fixtures";
import { dead, madFixture721B } from "./utils/madFixtures";

describe("MADRouter721", () => {
  type WalletWithAddress = Wallet & SignerWithAddress;

  // contract deployer/admin
  let owner: WalletWithAddress;

  // ambassador
  let amb: WalletWithAddress;

  // marketplace address
  let mad: WalletWithAddress;

  // extra EOAs
  let acc01: WalletWithAddress;
  let acc02: WalletWithAddress;

  let f721: MADFactory721;
  let m721: MADMarketplace721;
  let r721: MADRouter721;
  // let erc20: MockERC20;

  const price: BigNumber = ethers.utils.parseEther("1");

  before("Set signers and reset network", async () => {
    [owner, amb, mad, acc01, acc02] =
      await // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ethers as any).getSigners();

    await network.provider.send("hardhat_reset");
  });
  beforeEach("Load deployment fixtures", async () => {
    ({ f721, m721, r721 } = await loadFixture(
      madFixture721B,
    ));
    await r721.deployed();
    await m721.deployed();
    await f721.deployed();
  });

  describe("Init", async () => {
    it("Router should initialize", async () => {
      expect(r721).to.be.ok;

      // check each global var
      expect(await r721.callStatic.name()).to.eq("router");
      expect(await r721.MADFactory721()).to.eq(f721.address);
    });
  });
  describe("Set baseURI", async () => {
    it("Should revert for invalid collection type", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const minAddr = await f721.callStatic.getDeployedAddr(
        "MinSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          0,
          "MinSalt",
          "721Minimal",
          "MIN",
          price,
          1,
          "ipfs://cid/id.json",
          splAddr,
          750,
        );
      const min = await ethers.getContractAt(
        "ERC721Minimal",
        minAddr,
      );
      const tx = r721
        .connect(acc02)
        .setBase(min.address, "null");

      await expect(tx).to.be.revertedWith(
        RouterErrors.InvalidType,
      );
    });
    it("Should set baseURI for 721Basic collection type", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const basicAddr = await f721.callStatic.getDeployedAddr(
        "BasicSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          1,
          "BasicSalt",
          "721Basic",
          "BASIC",
          price,
          1000,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const colID = await f721.callStatic.getColID(basicAddr);
      const basic = await ethers.getContractAt(
        "ERC721Basic",
        basicAddr,
      );
      const tx = await r721
        .connect(acc02)
        .setBase(basicAddr, "null");

      expect(tx).to.be.ok;
      await expect(tx)
        .to.emit(r721, "BaseURI")
        .withArgs(colID, "null");
      expect(await basic.callStatic.getBaseURI()).to.eq(
        "null",
      );
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await expect(
        r721.connect(acc01).setBase(basicAddr, "void"),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
    it("Should set baseURI for 721Whitelist collection type", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          1000,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const colID = await f721.callStatic.getColID(wlAddr);
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      const tx = await r721
        .connect(acc02)
        .setBase(wlAddr, "null");

      expect(tx).to.be.ok;
      await expect(tx)
        .to.emit(r721, "BaseURI")
        .withArgs(colID, "null");
      expect(await wl.callStatic.getBaseURI()).to.eq("null");
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await expect(
        r721.connect(acc01).setBase(wlAddr, "void"),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
    it("Should set baseURI for 721Lazy collection type", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const lazyAddr = await f721.callStatic.getDeployedAddr(
        "LazySalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          3,
          "LazySalt",
          "721Lazy",
          "LAZY",
          ethers.constants.Zero,
          ethers.constants.Zero,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const colID = await f721.callStatic.getColID(lazyAddr);
      const lazy = await ethers.getContractAt(
        "ERC721Lazy",
        lazyAddr,
      );
      const tx = await r721
        .connect(acc02)
        .setBase(lazyAddr, "null");

      expect(tx).to.be.ok;
      await expect(tx)
        .to.emit(r721, "BaseURI")
        .withArgs(colID, "null");
      expect(await lazy.callStatic.getBaseURI()).to.eq(
        "null",
      );
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await expect(
        r721.connect(acc01).setBase(lazyAddr, "void"),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
  });
  describe("Whitelist Settings", async () => {
    it("Should revert for invalid collection type", async () => {
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("fakeRoot"),
      );
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const lazyAddr = await f721.callStatic.getDeployedAddr(
        "LazySalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          3,
          "LazySalt",
          "721Lazy",
          "LAZY",
          ethers.constants.Zero,
          ethers.constants.Zero,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const lazy = await ethers.getContractAt(
        "ERC721Lazy",
        lazyAddr,
      );
      const tx = r721
        .connect(acc02)
        .whitelistSettings(lazy.address, price, 100, root);

      await expect(tx).to.be.revertedWith(
        RouterErrors.InvalidType,
      );
    });
    it("Should set whitelist config for 721Whitelist collection type", async () => {
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("fakeRoot"),
      );
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          1000,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      const tx = await r721
        .connect(acc02)
        .whitelistSettings(wl.address, price, 100, root);

      expect(tx).to.be.ok;
      expect(await wl.callStatic.whitelistMerkleRoot()).to.eq(
        root,
      );
      expect(await wl.callStatic.whitelistPrice()).to.eq(
        price,
      );
      expect(await wl.callStatic.maxWhitelistSupply()).to.eq(
        100,
      );
    });
  });
  describe("FreeClaim Settings", async () => {
    it("Should revert for invalid collection type", async () => {
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("fakeRoot"),
      );
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const lazyAddr = await f721.callStatic.getDeployedAddr(
        "LazySalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          3,
          "LazySalt",
          "721Lazy",
          "LAZY",
          ethers.constants.Zero,
          ethers.constants.Zero,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const lazy = await ethers.getContractAt(
        "ERC721Lazy",
        lazyAddr,
      );
      const tx = r721
        .connect(acc02)
        .freeSettings(lazy.address, 1, 10, root);

      await expect(tx).to.be.revertedWith(
        RouterErrors.InvalidType,
      );
    });
    it("Should set freeClaim config for 721Whitelist collection type", async () => {
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("fakeRoot"),
      );
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          1000,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      const tx = await r721
        .connect(acc02)
        .freeSettings(wl.address, 1, 10, root);

      expect(tx).to.be.ok;
      expect(await wl.callStatic.claimListMerkleRoot()).to.eq(
        root,
      );
      expect(await wl.callStatic.freeAmount()).to.eq(1);
      expect(await wl.callStatic.maxFree()).to.eq(10);
    });
  });
  describe("Minimal SafeMint", async () => {
    it("Should revert for invalid collection type", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          1000,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const tx = r721.minimalSafeMint(wlAddr, acc01.address);
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );

      await expect(tx).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
    it("Should call safeMint for 721Minimal collection type", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const minAddr = await f721.callStatic.getDeployedAddr(
        "MinSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          0,
          "MinSalt",
          "721Minimal",
          "MIN",
          price,
          1,
          "cid/id.json",
          splAddr,
          750,
        );
      const min = await ethers.getContractAt(
        "ERC721Minimal",
        minAddr,
      );
      console.log(ethers.utils.parseEther('0.25'))
      const tx = await r721
        .connect(acc02)
        .minimalSafeMint(minAddr, acc01.address, {value: ethers.utils.parseEther("0.25")});
      console.log("minted successfully")

      expect(tx).to.be.ok;
      expect(await min.callStatic.ownerOf(1)).to.eq(
        acc01.address,
      );
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await expect(
        r721
          .connect(mad)
          .minimalSafeMint(minAddr, acc02.address, {value: ethers.utils.parseEther("0.25")}),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
      await expect(
        r721
          .connect(acc02)
          .minimalSafeMint(minAddr, acc02.address, {value: ethers.utils.parseEther("0.25")}),
      ).to.be.revertedWithCustomError(
        min,
        RouterErrors.AlreadyMinted,
      );
    });
  });
  describe("Burn", async () => {
    it("Should burn token for 721Minimal collection type", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const minAddr = await f721.callStatic.getDeployedAddr(
        "MinSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          0,
          "MinSalt",
          "721Minimal",
          "MIN",
          price,
          1,
          "ipfs://cid/id.json",
          splAddr,
          750,
        );
      const min = await ethers.getContractAt(
        "ERC721Minimal",
        minAddr,
      );
      await r721
        .connect(acc02)
        .setMintState(minAddr, true, 0);
      await min.connect(acc01).publicMint({ value: price });
      const tx = await r721.connect(acc02).burn(minAddr, []);
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      expect(tx).to.be.ok;
      expect(
        await min.callStatic.balanceOf(acc01.address),
      ).to.eq(0);
      await expect(
        r721.burn(minAddr, []),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
    it("Should burn tokens for 721Basic collection type", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const basicAddr = await f721.callStatic.getDeployedAddr(
        "BasicSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          1,
          "BasicSalt",
          "721Basic",
          "BASIC",
          price,
          1000,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const basic = await ethers.getContractAt(
        "ERC721Basic",
        basicAddr,
      );
      await r721
        .connect(acc02)
        .setMintState(basicAddr, true, 0);
      await basic.connect(acc01).mint(1, { value: price });
      const tx = await r721
        .connect(acc02)
        .burn(basicAddr, [1]);

      expect(tx).to.be.ok;
      expect(
        await basic.callStatic.balanceOf(acc01.address),
      ).to.eq(0);
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await expect(
        r721.burn(basicAddr, [1]),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
    it("Should burn tokens for 721Whitelist collection type", async () => {
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("fakeRoot"),
      );
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          1000,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      await r721
        .connect(acc02)
        .freeSettings(wl.address, 1, 10, root);
      await r721.connect(acc02).creatorMint(wlAddr, 1, {value:ethers.utils.parseEther("0.25")});
      const tx = await r721.connect(acc02).burn(wlAddr, [1]);
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      expect(tx).to.be.ok;
      expect(
        await wl.callStatic.balanceOf(acc02.address),
      ).to.eq(0);
      await expect(
        r721.burn(wlAddr, [1]),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
    it("Should burn tokens for 721Lazy collection type", async () => {
      const signer = ethers.Wallet.createRandom();
      // await f721.addAmbassador(amb.address);
      await f721.setSigner(await signer.getAddress());
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const lazyAddr = await f721.callStatic.getDeployedAddr(
        "LazySalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          3,
          "LazySalt",
          "721Lazy",
          "LAZY",
          ethers.constants.Zero,
          ethers.constants.Zero,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const lazy = await ethers.getContractAt(
        "ERC721Lazy",
        lazyAddr,
      );
      const net = await lazy.provider.getNetwork();
      const chainId = net.chainId;
      const bnPrice = ethers.utils.parseEther("1");
      const usrs = [owner.address, acc02.address];
      const vId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("voucher"),
      );
      const pk = Buffer.from(
        signer.privateKey.slice(2),
        "hex",
      );

      const domain = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ];
      const voucherType = [
        { name: "voucherId", type: "bytes32" },
        { name: "users", type: "address[]" },
        { name: "balances", type: "uint256[]" },
        { name: "amount", type: "uint256" },
        { name: "price", type: "uint256" },
      ];
      const domainData = {
        name: "721Lazy",
        version: "1",
        chainId: chainId,
        verifyingContract: lazy.address,
      };
      const Voucher = {
        voucherId: vId,
        users: usrs,
        balances: [1],
        amount: 1,
        price: bnPrice.toString(),
      };
      const data = JSON.stringify({
        types: {
          EIP712Domain: domain,
          Voucher: voucherType,
        },
        primaryType: "Voucher",
        domain: domainData,
        message: Voucher,
      });

      const parsedData = JSON.parse(data);
      const signature = signTypedData({
        privateKey: pk,
        data: parsedData,
        version: SignTypedDataVersion.V4,
      });
    
      const sigSplit = ethers.utils.splitSignature(signature);

      await lazy
        .connect(acc02)
        .lazyMint(
          Voucher,
          sigSplit.v,
          sigSplit.r,
          sigSplit.s,
          { value: price.mul(ethers.BigNumber.from(2)) },
        );
      const tx = await r721
        .connect(acc02)
        .burn(lazyAddr, [1, 2]);
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );

      expect(tx).to.be.ok;
      expect(await lazy.balanceOf(acc02.address)).to.eq(0);
      expect(await lazy.balanceOf(owner.address)).to.eq(0);
      await expect(
        r721.burn(lazyAddr, [1]),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
  });
  describe("Set MintState", async () => {
    it("Should revert for invalid stateType", async () => {
      const addr = await f721.getDeployedAddr("salt");
      const tx = r721.setMintState(addr, true, 3);

      await expect(tx).to.be.revertedWith(
        RouterErrors.InvalidType,
      );
    });
    it("Should revert for invalid tokenType", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const minAddr = await f721.callStatic.getDeployedAddr(
        "MinSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          0,
          "MinSalt",
          "721Minimal",
          "MIN",
          price,
          1,
          "ipfs://cid/id.json",
          splAddr,
          750,
        );
      const tx = r721
        .connect(acc02)
        .setMintState(minAddr, true, 2);

      await expect(tx).to.be.revertedWith(
        RouterErrors.InvalidType,
      );
    });
    it("Should set publicMintState for minimal, basic and whitelist colTypes", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const minAddr = await f721.callStatic.getDeployedAddr(
        "MinSalt",
      );
      const basicAddr = await f721.callStatic.getDeployedAddr(
        "BasicSalt",
      );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          0,
          "MinSalt",
          "721Minimal",
          "MIN",
          price,
          1,
          "ipfs://cid/id.json",
          splAddr,
          750,
        );
      const min = await ethers.getContractAt(
        "ERC721Minimal",
        minAddr,
      );
      await f721
        .connect(acc02)
        .createCollection(
          1,
          "BasicSalt",
          "721Basic",
          "BASIC",
          price,
          1000,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const basic = await ethers.getContractAt(
        "ERC721Basic",
        basicAddr,
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          1,
          "ipfs://cid/id.json",
          splAddr,
          750,
        );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );

      const tx1 = await r721
        .connect(acc02)
        .setMintState(minAddr, true, 0);
      const tx2 = await r721
        .connect(acc02)
        .setMintState(basicAddr, true, 0);
      const tx3 = await r721
        .connect(acc02)
        .setMintState(wlAddr, true, 0);

      expect(tx1).to.be.ok;
      expect(tx2).to.be.ok;
      expect(tx3).to.be.ok;
      expect(await min.callStatic.publicMintState()).to.eq(
        true,
      );
      expect(await basic.callStatic.publicMintState()).to.eq(
        true,
      );
      expect(await wl.callStatic.publicMintState()).to.eq(
        true,
      );
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await expect(
        r721.connect(acc01).setMintState(minAddr, true, 0),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
      await expect(
        r721.connect(acc01).setMintState(basicAddr, true, 0),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
      await expect(
        r721.connect(acc01).setMintState(wlAddr, true, 0),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
    it("Should set whitelistMintState for whitelist colType", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          1,
          "ipfs://cid/id.json",
          splAddr,
          750,
        );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      const tx = await r721
        .connect(acc02)
        .setMintState(wlAddr, true, 1);

      expect(tx).to.be.ok;
      expect(await wl.callStatic.whitelistMintState()).to.eq(
        true,
      );
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await expect(
        r721.connect(acc01).setMintState(wlAddr, true, 1),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
    it("Should set freeClaimState for whitelist colType", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          1,
          "ipfs://cid/id.json",
          splAddr,
          750,
        );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      const tx = await r721
        .connect(acc02)
        .setMintState(wlAddr, true, 2);

      expect(tx).to.be.ok;
      expect(await wl.callStatic.freeClaimState()).to.eq(
        true,
      );
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await expect(
        r721.connect(acc01).setMintState(wlAddr, true, 2),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
  });
  describe("Whitelist Creator Mint", async () => {
    it("Should revert for invalid coltype", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      await f721
        .connect(acc02)
        .createCollection(
          1,
          "BasicSalt",
          "721Basic",
          "BASIC",
          price,
          100,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const basicAddr = await f721.callStatic.getDeployedAddr(
        "BasicSalt",
      );
      const basic = await ethers.getContractAt(
        "ERC721Basic",
        basicAddr,
      );

      await expect(
        r721.connect(acc02).creatorMint(basic.address, 2),
      ).to.be.revertedWith(RouterErrors.InvalidType);
    });
    it("Should mint to creator", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          100,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("root"),
      );

      await r721
        .connect(acc02)
        .freeSettings(wlAddr, 1, 10, root);
      await r721.connect(acc02).setMintState(wlAddr, true, 2);
      const tx = await r721
        .connect(acc02)
        .creatorMint(wlAddr, 2, {value: ethers.utils.parseEther("0.25")});

      expect(tx).to.be.ok;
      expect(await wl.callStatic.freeClaimState()).to.be.true;
    });
  });
  describe("Whitelist token gifting", async () => {
    it("Should revert for invalid coltype", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      await f721
        .connect(acc02)
        .createCollection(
          1,
          "BasicSalt",
          "721Basic",
          "BASIC",
          price,
          100,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const basicAddr = await f721.callStatic.getDeployedAddr(
        "BasicSalt",
      );
      const addrs = [owner.address, mad.address];
      await expect(
        r721.connect(acc02).gift(basicAddr, addrs),
      ).to.be.revertedWith(RouterErrors.InvalidType);
    });
    it("Should gift tokens", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          100,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("root"),
      );
      const addrs = [owner.address, mad.address];
      await r721
        .connect(acc02)
        .freeSettings(wlAddr, 1, 10, root);
      await r721.connect(acc02).setMintState(wlAddr, true, 2);
      const tx = await r721
        .connect(acc02)
        .gift(wlAddr, addrs, { value: ethers.utils.parseEther("0.25") });

      expect(tx).to.be.ok;
      expect(
        await wl.callStatic.balanceOf(owner.address),
      ).to.eq(1);
      expect(
        await wl.callStatic.balanceOf(mad.address),
      ).to.eq(1);
    });
  });
  describe("Creator Withdraw", async () => {
    it("Should withdraw balance and ERC20 for all colTypes", async () => {
      const ERC20 = await ethers.getContractFactory(
        "MockERC20",
      );
      const erc20 = (await ERC20.deploy(
        BigNumber.from(2).pow(255),
      )) as MockERC20;

      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const minAddr = await f721.callStatic.getDeployedAddr(
        "MinSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          0,
          "MinSalt",
          "721Minimal",
          "MIN",
          price,
          1,
          "ipfs://cid/id.json",
          splAddr,
          750,
        );
      const min = await ethers.getContractAt(
        "ERC721Minimal",
        minAddr,
      );
      await erc20.mint(min.address, price);
      await r721
        .connect(acc02)
        .setMintState(min.address, true, 0);
      await min.connect(acc01).publicMint({ value: price });
      const bal1 = await ethers.provider.getBalance(
        acc02.address,
      );
      const bal2 = await erc20.balanceOf(acc02.address);
      const tx1 = await r721
        .connect(acc02)
        .withdraw(min.address, dead);
      const tx2 = await r721
        .connect(acc02)
        .withdraw(min.address, erc20.address);
      const newBal1 = await ethers.provider.getBalance(
        acc02.address,
      );
      const newBal2 = await erc20.balanceOf(acc02.address);

      const basicAddr = await f721.callStatic.getDeployedAddr(
        "salt",
      );
      await f721
        .connect(mad)
        .splitterCheck(
          "MADSplitter2",
          amb.address,
          dead,
          20,
          0,
        );
      const madSpl = await f721.callStatic.getDeployedAddr(
        "MADSplitter2",
      );

      await f721
        .connect(mad)
        .createCollection(
          1,
          "salt",
          "721Basic",
          "BAS",
          price,
          1000,
          "ipfs://cid/",
          madSpl,
          750,
        );
      const basic = await ethers.getContractAt(
        "ERC721Basic",
        basicAddr,
      );
      await erc20.mint(basic.address, price);
      await r721
        .connect(mad)
        .setMintState(basic.address, true, 0);
      await basic.connect(acc01).mint(1, { value: price });
      const bala = await ethers.provider.getBalance(
        mad.address,
      );
      const balb = await erc20.balanceOf(mad.address);
      const txa = await r721
        .connect(mad)
        .withdraw(basic.address, dead);
      const txb = await r721
        .connect(mad)
        .withdraw(basic.address, erc20.address);
      const newBala = await ethers.provider.getBalance(
        mad.address,
      );
      const newBalb = await erc20.balanceOf(mad.address);

      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      await f721
        .connect(amb)
        .splitterCheck("MADSplitter3", dead, dead, 0, 0);
      const ambSpl = await f721.callStatic.getDeployedAddr(
        "MADSplitter3",
      );
      await f721
        .connect(amb)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          1000,
          "ipfs://cid/",
          ambSpl,
          750,
        );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      await erc20.mint(wl.address, price);
      await r721
        .connect(amb)
        .setMintState(wl.address, true, 0);
      await wl.connect(acc01).mint(1, { value: price });
      const balc = await ethers.provider.getBalance(
        amb.address,
      );
      const bald = await erc20.balanceOf(amb.address);
      const txc = await r721
        .connect(amb)
        .withdraw(wl.address, dead);
      const txd = await r721
        .connect(amb)
        .withdraw(wl.address, erc20.address);
      const newBalc = await ethers.provider.getBalance(
        amb.address,
      );
      const newBald = await erc20.balanceOf(amb.address);

      const userBffr = getSignerAddrs(
        10,
        await ethers.getSigners(),
      );
      const newUser = userBffr[9];

      await f721
        .connect(await ethers.getSigner(newUser))
        .splitterCheck("MADSplitter4", dead, dead, 0, 0);
      const userSpl = await f721.callStatic.getDeployedAddr(
        "MADSplitter4",
      );
      const lazyAddr = await f721.callStatic.getDeployedAddr(
        "LazySalt",
      );
      await f721
        .connect(await ethers.getSigner(newUser))
        .createCollection(
          3,
          "LazySalt",
          "721Lazy",
          "LAZY",
          ethers.constants.Zero,
          ethers.constants.Zero,
          "ipfs://cid/",
          userSpl,
          750,
        );
      const lazy = await ethers.getContractAt(
        "ERC721Lazy",
        lazyAddr,
      );
      const net = await lazy.provider.getNetwork();
      const chainId = net.chainId;
      const bnPrice = ethers.utils.parseEther("1");
      const usrs = [acc01.address];
      const vId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("voucher"),
      );
      const signer = ethers.Wallet.createRandom();
      const signerAddr = await signer.getAddress();
      await r721.setSigner(lazyAddr, signerAddr);
      const pk = Buffer.from(
        signer.privateKey.slice(2),
        "hex",
      );

      const domain = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ];
      const voucherType = [
        { name: "voucherId", type: "bytes32" },
        { name: "users", type: "address[]" },
        { name: "balances", type: "uint256[]" }, 
        { name: "amount", type: "uint256" },
        { name: "price", type: "uint256" },
      ];
      const domainData = {
        name: "721Lazy",
        version: "1",
        chainId: chainId,
        verifyingContract: lazy.address,
      };
      const Voucher = {
        voucherId: vId,
        users: usrs,
        balances: [1],
        amount: 1,
        price: bnPrice.toString(),
      };
      const data = JSON.stringify({
        types: {
          EIP712Domain: domain,
          Voucher: voucherType,
        },
        primaryType: "Voucher",
        domain: domainData,
        message: Voucher,
      });

      const parsedData = JSON.parse(data);
      const signature = signTypedData({
        privateKey: pk,
        data: parsedData,
        version: SignTypedDataVersion.V4,
      });
      const sigSplit = ethers.utils.splitSignature(signature);
      await erc20.mint(lazy.address, price);
      
      await lazy
        .connect(acc01)
        .lazyMint(
          Voucher,
          sigSplit.v,
          sigSplit.r,
          sigSplit.s,
          { value: price },
        );

      const bal3 = await ethers.provider.getBalance(newUser);
      const bal4 = await erc20.balanceOf(newUser);
      const tx3 = await r721
        .connect(await ethers.getSigner(newUser))
        .withdraw(lazy.address, dead);
      const tx4 = await r721
        .connect(await ethers.getSigner(newUser))
        .withdraw(lazy.address, erc20.address);
      const newBal3 = await ethers.provider.getBalance(
        newUser,
      );
      const newBal4 = await erc20.balanceOf(newUser);
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );

      expect(tx1).to.be.ok;
      expect(tx2).to.be.ok;
      expect(bal1).to.be.lt(newBal1);
      // we no longer take 10% of platform fees
      expect(price.mul(8000).div(10_000)).to.be.eq(
        newBal2.sub(bal2),
      );

      await expect(
        r721
          .connect(acc01)
          .withdraw(min.address, erc20.address),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
      await expect(
        r721
          .connect(acc02)
          .withdraw(min.address, erc20.address),
      ).to.be.revertedWith(RouterErrors.NoFunds);
      await expect(
        r721.connect(acc02).withdraw(min.address, dead),
      ).to.be.revertedWith(RouterErrors.NoFunds);

      expect(txa).to.be.ok;
      expect(txb).to.be.ok;
      expect(bala).to.be.below(newBala);
      expect(balb).to.be.below(newBalb);

      await expect(
        r721
          .connect(acc01)
          .withdraw(basic.address, erc20.address),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
      await expect(
        r721
          .connect(mad)
          .withdraw(basic.address, erc20.address),
      ).to.be.revertedWith(RouterErrors.NoFunds);
      await expect(
        r721.connect(mad).withdraw(basic.address, dead),
      ).to.be.revertedWith(RouterErrors.NoFunds);

      expect(txc).to.be.ok;
      expect(txd).to.be.ok;
      expect(balc).to.be.lt(newBalc);
      expect(bald).to.be.lt(newBald);

      await expect(
        r721
          .connect(acc01)
          .withdraw(wl.address, erc20.address),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
      await expect(
        r721.connect(amb).withdraw(wl.address, erc20.address),
      ).to.be.revertedWith(RouterErrors.NoFunds);
      await expect(
        r721.connect(amb).withdraw(wl.address, dead),
      ).to.be.revertedWith(RouterErrors.NoFunds);

      expect(tx3).to.be.ok;
      expect(tx4).to.be.ok;
      expect(bal3).to.be.below(newBal3);
      expect(bal4).to.be.below(newBal4);

      await expect(
        r721
          .connect(acc01)
          .withdraw(lazy.address, erc20.address),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
      await expect(
        r721
          .connect(await ethers.getSigner(newUser))
          .withdraw(lazy.address, erc20.address),
      ).to.be.revertedWith(RouterErrors.NoFunds);
      await expect(
        r721
          .connect(await ethers.getSigner(newUser))
          .withdraw(lazy.address, dead),
      ).to.be.revertedWith(RouterErrors.NoFunds);
    });
  });
  describe("Only Owner", async () => {
    it("Should update contract's owner", async () => {
      const tx = await r721.setOwner(mad.address);

      expect(tx).to.be.ok;
      await expect(tx)
        .to.emit(r721, "OwnerUpdated")
        .withArgs(owner.address, mad.address);
      expect(await r721.callStatic.owner()).to.eq(
        mad.address,
      );
      await expect(
        r721.connect(acc02).setOwner(acc01.address),
      ).to.be.revertedWith(RouterErrors.Unauthorized);
    });
    it("Should initialize paused and unpaused states", async () => {
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("root"),
      );
      const addr = await f721.callStatic.getDeployedAddr(
        "salt",
      );
      const tx = await r721.pause();
      expect(tx).to.be.ok;
      await expect(
        r721.connect(acc01).pause(),
      ).to.be.revertedWith(RouterErrors.Unauthorized);
      await expect(r721.setBase(addr, "")).to.be.revertedWith(
        RouterErrors.Paused,
      );
      await expect(
        r721.whitelistSettings(addr, price, 100, root),
      ).to.be.revertedWith(RouterErrors.Paused);
      await expect(
        r721.freeSettings(addr, 1, 100, root),
      ).to.be.revertedWith(RouterErrors.Paused);
      await expect(
        r721.minimalSafeMint(addr, acc01.address),
      ).to.be.revertedWith(RouterErrors.Paused);
      await expect(
        r721.burn(addr, [1, 2, 3]),
      ).to.be.revertedWith(RouterErrors.Paused);
      await expect(
        r721.setMintState(addr, false, 2),
      ).to.be.revertedWith(RouterErrors.Paused);
      await expect(
        r721.creatorMint(addr, 1),
      ).to.be.revertedWith(RouterErrors.Paused);
      await expect(
        r721.gift(addr, [acc01.address, mad.address]),
      ).to.be.revertedWith(RouterErrors.Paused);
      await expect(
        r721.withdraw(addr, addr),
      ).to.be.revertedWith(RouterErrors.Paused);
      await expect(
        r721.connect(acc02).unpause(),
      ).to.be.revertedWith(RouterErrors.Unauthorized);
      expect(await r721.unpause()).to.be.ok;
    });
  });

  // set base fees
  describe("Minimal SafeMint-setBaseFee", async () => {
    it("Should call safeMint for 721Minimal collection type", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const minAddr = await f721.callStatic.getDeployedAddr(
        "MinSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          0,
          "MinSalt",
          "721Minimal",
          "MIN",
          price,
          1,
          "cid/id.json",
          splAddr,
          750,
        );
      const min = await ethers.getContractAt(
        "ERC721Minimal",
        minAddr,
      );
      await r721.setFees(ethers.utils.parseEther("2.5"), ethers.utils.parseEther("0.5"));
      await expect(r721
        .connect(acc02)
        .minimalSafeMint(minAddr, acc01.address, {value: ethers.utils.parseEther("0.25")})
      ).to.be.revertedWithCustomError(
        min, 
        MinimalErrors.WrongPrice
      );

      const tx = await r721
        .connect(acc02)
        .minimalSafeMint(minAddr, acc01.address, {value: ethers.utils.parseEther("2.5")});

      expect(tx).to.be.ok;
      expect(await min.callStatic.ownerOf(1)).to.eq(
        acc01.address,
      );
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await expect(
        r721
          .connect(mad)
          .minimalSafeMint(minAddr, acc02.address, {value: ethers.utils.parseEther("2.5")}),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
      await expect(
        r721
          .connect(acc02)
          .minimalSafeMint(minAddr, acc02.address, {value: ethers.utils.parseEther("2.5")}),
      ).to.be.revertedWithCustomError(
        min,
        RouterErrors.AlreadyMinted,
      );
    });
  });
  describe("Burn-setBaseFee", async () => {
    it("Should burn tokens for 721Basic collection type", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const basicAddr = await f721.callStatic.getDeployedAddr(
        "BasicSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          1,
          "BasicSalt",
          "721Basic",
          "BASIC",
          price,
          1000,
          "ipfs://cid/",
          splAddr,
          750,
        );
      await r721.setFees(ethers.utils.parseEther("2.5"), ethers.utils.parseEther("0.5"));
      
      const basic = await ethers.getContractAt(
        "ERC721Basic",
        basicAddr,
      );
      await r721
        .connect(acc02)
        .setMintState(basicAddr, true, 0);
      await basic.connect(acc01).mint(1, { value: price });

      await expect(r721
        .connect(acc02)
        .burn(basicAddr, [1])
      ).to.be.revertedWithCustomError(
        basic,
        BasicErrors.WrongPrice
      );
      
      const tx = await r721
        .connect(acc02)
        .burn(basicAddr, [1], {value: ethers.utils.parseEther("0.5")});

      expect(tx).to.be.ok;
      expect(
        await basic.callStatic.balanceOf(acc01.address),
      ).to.eq(0);
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await expect(
        r721.burn(basicAddr, [1], {value: ethers.utils.parseEther("0.5")}),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
    it("Should burn tokens for 721Whitelist collection type", async () => {
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("fakeRoot"),
      );
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          1000,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      await r721
        .connect(acc02)
        .freeSettings(wl.address, 1, 10, root);
      await r721.connect(acc02).creatorMint(wlAddr, 1, {value:ethers.utils.parseEther("0.25")});
      const tx = await r721.connect(acc02).burn(wlAddr, [1]);
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );
      await r721.setFees(ethers.utils.parseEther("2.5"), ethers.utils.parseEther("0.5"));
      expect(tx).to.be.ok;
      expect(
        await wl.callStatic.balanceOf(acc02.address),
      ).to.eq(0);
      await expect(
        r721.burn(wlAddr, [1]),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
    it("Should burn tokens for 721Lazy collection type", async () => {
      const signer = ethers.Wallet.createRandom();
      // await f721.addAmbassador(amb.address);
      await f721.setSigner(await signer.getAddress());
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      const lazyAddr = await f721.callStatic.getDeployedAddr(
        "LazySalt",
      );
      await f721
        .connect(acc02)
        .createCollection(
          3,
          "LazySalt",
          "721Lazy",
          "LAZY",
          ethers.constants.Zero,
          ethers.constants.Zero,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const lazy = await ethers.getContractAt(
        "ERC721Lazy",
        lazyAddr,
      );
      const net = await lazy.provider.getNetwork();
      const chainId = net.chainId;
      const bnPrice = ethers.utils.parseEther("1");
      const usrs = [owner.address, acc02.address];
      const vId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("voucher"),
      );
      const pk = Buffer.from(
        signer.privateKey.slice(2),
        "hex",
      );

      const domain = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ];
      const voucherType = [
        { name: "voucherId", type: "bytes32" },
        { name: "users", type: "address[]" },
        { name: "balances", type: "uint256[]" },
        { name: "amount", type: "uint256" },
        { name: "price", type: "uint256" },
      ];
      const domainData = {
        name: "721Lazy",
        version: "1",
        chainId: chainId,
        verifyingContract: lazy.address,
      };
      const Voucher = {
        voucherId: vId,
        users: usrs,
        balances: [1],
        amount: 1,
        price: bnPrice.toString(),
      };
      const data = JSON.stringify({
        types: {
          EIP712Domain: domain,
          Voucher: voucherType,
        },
        primaryType: "Voucher",
        domain: domainData,
        message: Voucher,
      });

      const parsedData = JSON.parse(data);
      const signature = signTypedData({
        privateKey: pk,
        data: parsedData,
        version: SignTypedDataVersion.V4,
      });
    
      const sigSplit = ethers.utils.splitSignature(signature);
      await r721.setFees(ethers.utils.parseEther("2.5"), ethers.utils.parseEther("0.5"));
      await lazy
        .connect(acc02)
        .lazyMint(
          Voucher,
          sigSplit.v,
          sigSplit.r,
          sigSplit.s,
          { value: price.mul(ethers.BigNumber.from(2)) },
        );
      await expect(r721
        .connect(acc02)
        .burn(lazyAddr, [1, 2])
      ).to.be.revertedWithCustomError(
        lazy,
        LazyErrors.WrongPrice
      );
      const tx = await r721
        .connect(acc02)
        .burn(lazyAddr, [1, 2], {value: ethers.utils.parseEther("0.5")});
      const verArt = await artifacts.readArtifact(
        "FactoryVerifier",
      );
      const ver = new ethers.Contract(
        f721.address,
        verArt.abi,
        ethers.provider,
      );

      expect(tx).to.be.ok;
      expect(await lazy.balanceOf(acc02.address)).to.eq(0);
      expect(await lazy.balanceOf(owner.address)).to.eq(0);
      await expect(
        r721.burn(lazyAddr, [1], {value: ethers.utils.parseEther("0.5")}),
      ).to.be.revertedWithCustomError(
        ver,
        RouterErrors.AccessDenied,
      );
    });
  });
  describe("Whitelist Creator Mint-setBaseFee", async () => {
    it("Should mint to creator", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          100,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("root"),
      );
      await r721.setFees(ethers.utils.parseEther("2.5"), ethers.utils.parseEther("0.5"));
      await r721
        .connect(acc02)
        .freeSettings(wlAddr, 1, 10, root);
      await r721.connect(acc02).setMintState(wlAddr, true, 2);
        
      await expect(r721
        .connect(acc02)
        .creatorMint(wlAddr, 2, {value: ethers.utils.parseEther("0.25")})
      ).to.be.revertedWithCustomError(
        wl,
        WhitelistErrors.WrongPrice
      );

      const tx = await r721
        .connect(acc02)
        .creatorMint(wlAddr, 2, {value: ethers.utils.parseEther("2.5")});

      expect(tx).to.be.ok;
      expect(await wl.callStatic.freeClaimState()).to.be.true;
    });
  });
  describe("Whitelist token gifting-setBaseFee", async () => {
    it("Should gift tokens", async () => {
      // await f721.addAmbassador(amb.address);
      await f721
        .connect(acc02)
        .splitterCheck(
          "MADSplitter1",
          amb.address,
          dead,
          20,
          0,
        );
      const splAddr = await f721.callStatic.getDeployedAddr(
        "MADSplitter1",
      );
      await f721
        .connect(acc02)
        .createCollection(
          2,
          "WhiteSalt",
          "721Whitelist",
          "WHITE",
          price,
          100,
          "ipfs://cid/",
          splAddr,
          750,
        );
      const wlAddr = await f721.callStatic.getDeployedAddr(
        "WhiteSalt",
      );
      const wl = await ethers.getContractAt(
        "ERC721Whitelist",
        wlAddr,
      );
      const root = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("root"),
      );
      await r721.setFees(ethers.utils.parseEther("2.5"), ethers.utils.parseEther("0.5"));
      const addrs = [owner.address, mad.address];
      await r721
        .connect(acc02)
        .freeSettings(wlAddr, 1, 10, root);
      await r721.connect(acc02).setMintState(wlAddr, true, 2);

      await expect(r721
        .connect(acc02)
        .gift(wlAddr, addrs, { value: ethers.utils.parseEther("0.25") })
      ).to.be.revertedWithCustomError(
        wl,
        WhitelistErrors.WrongPrice
      );

      const tx = await r721
        .connect(acc02)
        .gift(wlAddr, addrs, { value: ethers.utils.parseEther("2.5") });

      expect(tx).to.be.ok;
      expect(
        await wl.callStatic.balanceOf(owner.address),
      ).to.eq(1);
      expect(
        await wl.callStatic.balanceOf(mad.address),
      ).to.eq(1);
    });
  });
});
