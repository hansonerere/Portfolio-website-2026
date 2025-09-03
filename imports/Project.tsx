import imgImage from "figma:asset/93d12304ac1fc3f4c88641c169e713e75cbe858a.png";
import imgImage1 from "figma:asset/83036f337a9ed67a6ec4903650138ca21019841b.png";
import imgImage2 from "figma:asset/28489c1147cccbd0a36fd631afd20f2475f30219.png";
import imgImage3 from "figma:asset/675a62620d6ae4d93cdd1feb0eaeb0d4bd5f36de.png";
import imgImage4 from "figma:asset/1ec33c648ee94b90cb72df21bd7c6c1ce783d303.png";
import imgImage5 from "figma:asset/63270adccc7381c15b1490cb37909f5da7c200b0.png";
import imgImage6 from "figma:asset/b6165ec8456ba8f47d19fe59642c213117b0205f.png";
import imgImage7 from "figma:asset/c8f16b2b082d44265b8a41906b9d8e2ba067a66c.png";
import imgPhoto1507652313519D4E9174996Dd from "figma:asset/6f5ff6ec339e90668fa2162ee354fe1a94bb2ab1.png";
import imgPhoto1622020886177239Ee6E69B39 from "figma:asset/814d173d3f67b52eb179d7a4f5cba3522f845608.png";

function Button() {
  return (
    <div
      className="basis-0 bg-[#212121] grow h-12 max-w-[565.59px] min-h-px min-w-px relative rounded-[40px] shrink-0"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center max-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row h-12 items-center justify-center max-w-inherit pb-[17.5px] pt-[14.5px] px-4 relative w-full">
          <div className="basis-0 flex flex-col font-['Red_Hat_Display:SemiBold',_sans-serif] font-semibold grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#eeeeee] text-[0px] text-center">
            <p className="block leading-[16px] text-[16px]">Home</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-center max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Link"
    >
      <Button />
    </div>
  );
}

function LinkMargin() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start max-w-[565.59px] pb-8 pt-0 px-0 relative shrink-0 w-full"
      data-name="Link:margin"
    >
      <Link />
    </div>
  );
}

function Paragraph() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-center justify-between leading-[0] max-w-[565.59px] p-0 relative shrink-0 text-[#9e9e9e] text-[0px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-[16px] text-nowrap whitespace-pre">
          Info
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block font-['Red_Hat_Display:Regular',_sans-serif] font-normal leading-[22.4px] text-[16px] text-nowrap whitespace-pre">
          Show more
        </p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[533.59px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[0px] text-left text-nowrap">
        <p className="block leading-[22.4px] text-[16px] whitespace-pre">
          About us
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[533.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="basis-0 flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal grow justify-center leading-[22.4px] min-h-px min-w-px relative shrink-0 text-[#9e9e9e] text-[0px] text-[16px] text-left">
        <p className="block mb-0">
          We are a studio founded by Scandinavian expats in sunny Los Angeles.
          We
        </p>
        <p className="block mb-0">
          work with globally recognized brands, as well as local creatives.
          Reach out
        </p>
        <p className="block">to us for your next campaign or rebranding!</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[2.89px] items-start justify-start max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading2 />
      <Container />
    </div>
  );
}

function Link1() {
  return (
    <div
      className="absolute bg-[#212121] box-border content-stretch flex flex-col gap-[7px] items-start justify-start left-0 max-w-[565.59px] pb-2 pt-[7px] px-4 right-0 rounded-2xl top-0"
      data-name="Link"
    >
      <Paragraph />
      <Container1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-center justify-between leading-[0] max-w-[565.59px] p-0 relative shrink-0 text-[#212121] text-[0px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-[16px] text-nowrap whitespace-pre">
          Project
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block font-['Red_Hat_Display:Regular',_sans-serif] font-normal leading-[22.4px] text-[16px] text-nowrap whitespace-pre">
          Show more
        </p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div
      className="max-w-[533.59px] relative rounded-lg shrink-0 size-16"
      data-name="Container"
    >
      <div
        className="[background-size:64px_80px] absolute bg-repeat bg-top-left inset-0 rounded-lg"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage}')` }}
      />
    </div>
  );
}

function Heading4() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0f0f0f] text-[0px] text-left text-nowrap">
        <p className="block leading-[22.4px] text-[16px] whitespace-pre">
          Casablanco
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212121] text-[0px] text-left text-nowrap">
        <p className="block leading-[22.4px] text-[16px] whitespace-pre">
          Rebranding for Californian luxurious furniture maker, Casablanco.
        </p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[3px] grow items-start justify-start max-w-[533.59px] min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Heading4 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="basis-0 bg-[#cccccc] grow h-[0.5px] max-w-[426.872px] min-h-px min-w-px shrink-0"
        data-name="Horizontal Divider"
      />
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#212121] text-[0px] text-left text-nowrap">
        <p className="block leading-[16.8px] text-[12px] whitespace-pre">
          2025
        </p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div
      className="absolute bg-[#eeeeee] box-border content-stretch flex flex-col gap-2 items-start justify-start left-0 max-w-[565.59px] pb-[7.9px] pt-[7px] px-4 right-0 rounded-2xl top-[147.95px]"
      data-name="Link"
    >
      <Paragraph1 />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-center justify-between leading-[0] max-w-[565.59px] p-0 relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Project
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Show more
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div
      className="max-w-[533.59px] relative rounded-lg shrink-0 size-16"
      data-name="Container"
    >
      <div
        className="[background-size:64px_96px] absolute bg-repeat bg-top-left inset-0 rounded-lg"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage1}')` }}
      />
    </div>
  );
}

function Heading5() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">
          Drowning in Dusk
        </p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">
          Brand new identity for a renowned fashion designer.
        </p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[3px] grow items-start justify-start max-w-[533.59px] min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Heading5 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container7 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="basis-0 bg-[#616161] grow h-[0.5px] max-w-[426.872px] min-h-px min-w-px shrink-0"
        data-name="Horizontal Divider"
      />
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[12px] text-left text-nowrap">
        <p className="block leading-[16.8px] whitespace-pre">2025</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div
      className="absolute bg-[#212121] box-border content-stretch flex flex-col gap-2 items-start justify-start left-0 max-w-[565.59px] pb-[7.9px] pt-[7px] px-4 right-0 rounded-2xl top-[291.14px]"
      data-name="Link"
    >
      <Paragraph2 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-center justify-between leading-[0] max-w-[565.59px] p-0 relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Project
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Show more
        </p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div
      className="max-w-[533.59px] relative rounded-lg shrink-0 size-16"
      data-name="Container"
    >
      <div
        className="[background-size:64px_96px] absolute bg-repeat bg-top-left inset-0 rounded-lg"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage2}')` }}
      />
    </div>
  );
}

function Heading6() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">SIKTAK</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] pb-[0.585px] pt-0 px-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="basis-0 flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal grow justify-center leading-[22.4px] min-h-px min-w-px relative shrink-0 text-[#9e9e9e] text-[16px] text-left">
        <p className="block mb-0">
          A fresh identity for the highly beloved Korean restaurant,
        </p>
        <p className="block">SIKTAK.</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[3.195px] grow items-start justify-start max-w-[533.59px] min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Heading6 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container12 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between max-w-[565.59px] pb-0 pt-[0.9px] px-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="basis-0 bg-[#616161] grow h-[0.5px] max-w-[426.872px] min-h-px min-w-px shrink-0"
        data-name="Horizontal Divider"
      />
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[12px] text-left text-nowrap">
        <p className="block leading-[16.8px] whitespace-pre">2025</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div
      className="absolute bg-[#212121] box-border content-stretch flex flex-col gap-[7px] items-start justify-start left-0 max-w-[565.59px] pb-[7.9px] pt-[7px] px-4 right-0 rounded-2xl top-[434.33px]"
      data-name="Link"
    >
      <Paragraph3 />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-center justify-between leading-[0] max-w-[565.59px] p-0 relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Project
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Show more
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div
      className="max-w-[533.59px] relative rounded-lg shrink-0 size-16"
      data-name="Container"
    >
      <div
        className="[background-size:96px_64px] absolute bg-repeat bg-top-left inset-0 rounded-lg"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage3}')` }}
      />
    </div>
  );
}

function Heading7() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">AM/PM?</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">
          A grownup rebrand for this Californian marketing agency.
        </p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[3px] grow items-start justify-start max-w-[533.59px] min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Heading7 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container17 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="basis-0 bg-[#616161] grow h-[0.5px] max-w-[426.872px] min-h-px min-w-px shrink-0"
        data-name="Horizontal Divider"
      />
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[12px] text-left text-nowrap">
        <p className="block leading-[16.8px] whitespace-pre">2025</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div
      className="absolute bg-[#212121] box-border content-stretch flex flex-col gap-2 items-start justify-start left-0 max-w-[565.59px] pb-[7.9px] pt-[7px] px-4 right-0 rounded-2xl top-[584.69px]"
      data-name="Link"
    >
      <Paragraph4 />
      <Container20 />
      <Container21 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-center justify-between leading-[0] max-w-[565.59px] p-0 relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Project
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Show more
        </p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div
      className="max-w-[533.59px] relative rounded-lg shrink-0 size-16"
      data-name="Container"
    >
      <div
        className="[background-size:113.684px_64px] absolute bg-repeat bg-top-left inset-0 rounded-lg"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage4}')` }}
      />
    </div>
  );
}

function Heading8() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">tmrw</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] pb-[0.585px] pt-0 px-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="basis-0 flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal grow justify-center leading-[22.4px] min-h-px min-w-px relative shrink-0 text-[#9e9e9e] text-[16px] text-left">
        <p className="block mb-0">{`We proudly put the finishing touches of tmrw's 2026 strategy`}</p>
        <p className="block">and further brand growth.</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[3.195px] grow items-start justify-start max-w-[533.59px] min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Heading8 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container22 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between max-w-[565.59px] pb-0 pt-[0.9px] px-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="basis-0 bg-[#616161] grow h-[0.5px] max-w-[426.872px] min-h-px min-w-px shrink-0"
        data-name="Horizontal Divider"
      />
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[12px] text-left text-nowrap">
        <p className="block leading-[16.8px] whitespace-pre">2025</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div
      className="absolute bg-[#212121] box-border content-stretch flex flex-col gap-[7px] items-start justify-start left-0 max-w-[565.59px] pb-[7.9px] pt-[7px] px-4 right-0 rounded-2xl top-[727.88px]"
      data-name="Link"
    >
      <Paragraph5 />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-center justify-between leading-[0] max-w-[565.59px] p-0 relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Project
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Show more
        </p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div
      className="max-w-[533.59px] relative rounded-lg shrink-0 size-16"
      data-name="Container"
    >
      <div
        className="[background-size:64px_96px] absolute bg-repeat bg-top-left inset-0 rounded-lg"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage5}')` }}
      />
    </div>
  );
}

function Heading9() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">
          Beyond the Pines
        </p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] pb-[0.585px] pt-0 px-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="basis-0 flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal grow justify-center leading-[22.4px] min-h-px min-w-px relative shrink-0 text-[#9e9e9e] text-[16px] text-left">
        <p className="block mb-0">
          New vision for Mexican/American tequila maker, Beyond the
        </p>
        <p className="block">Pines.</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[3.195px] grow items-start justify-start max-w-[533.59px] min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Heading9 />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container27 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between max-w-[565.59px] pb-0 pt-[0.9px] px-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="basis-0 bg-[#616161] grow h-[0.5px] max-w-[426.872px] min-h-px min-w-px shrink-0"
        data-name="Horizontal Divider"
      />
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[12px] text-left text-nowrap">
        <p className="block leading-[16.8px] whitespace-pre">2025</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div
      className="absolute bg-[#212121] box-border content-stretch flex flex-col gap-[7px] items-start justify-start left-0 max-w-[565.59px] pb-[7.89px] pt-[7px] px-4 right-0 rounded-2xl top-[878.23px]"
      data-name="Link"
    >
      <Paragraph6 />
      <Container30 />
      <Container31 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-center justify-between leading-[0] max-w-[565.59px] p-0 relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Project
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Show more
        </p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div
      className="max-w-[533.59px] relative rounded-lg shrink-0 size-16"
      data-name="Container"
    >
      <div
        className="[background-size:96px_64px] absolute bg-repeat bg-top-left inset-0 rounded-lg"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage6}')` }}
      />
    </div>
  );
}

function Heading10() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">OUTOFSIGHT</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">
          Rebrand for the luxury eyewear designers, OUTOFSIGHT.
        </p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[3px] grow items-start justify-start max-w-[533.59px] min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Heading10 />
      <Container33 />
    </div>
  );
}

function Container35() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container32 />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="basis-0 bg-[#616161] grow h-[0.5px] max-w-[426.872px] min-h-px min-w-px shrink-0"
        data-name="Horizontal Divider"
      />
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[12px] text-left text-nowrap">
        <p className="block leading-[16.8px] whitespace-pre">2025</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div
      className="absolute bg-[#212121] box-border content-stretch flex flex-col gap-2 items-start justify-start left-0 max-w-[565.59px] pb-[7.9px] pt-[7px] px-4 right-0 rounded-2xl top-[1028.59px]"
      data-name="Link"
    >
      <Paragraph7 />
      <Container35 />
      <Container36 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-center justify-between leading-[0] max-w-[565.59px] p-0 relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Project
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[22.4px] text-nowrap whitespace-pre">
          Show more
        </p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div
      className="max-w-[533.59px] relative rounded-lg shrink-0 size-16"
      data-name="Container"
    >
      <div
        className="[background-size:100%_153.43%] absolute bg-left bg-no-repeat inset-0 rounded-lg"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage7}')` }}
      />
    </div>
  );
}

function Heading11() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">Motiv8/ate</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[461.59px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">
          Fresh identity for New York based studio, Motiv8/ate.
        </p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[3px] grow items-start justify-start max-w-[533.59px] min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Heading11 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container37 />
      <Container39 />
    </div>
  );
}

function Container41() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between max-w-[565.59px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        className="basis-0 bg-[#616161] grow h-[0.5px] max-w-[426.872px] min-h-px min-w-px shrink-0"
        data-name="Horizontal Divider"
      />
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[12px] text-left text-nowrap">
        <p className="block leading-[16.8px] whitespace-pre">2025</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div
      className="absolute bg-[#212121] box-border content-stretch flex flex-col gap-2 items-start justify-start left-0 max-w-[565.59px] pb-[7.9px] pt-[7px] px-4 right-0 rounded-2xl top-[1171.78px]"
      data-name="Link"
    >
      <Paragraph8 />
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container42() {
  return (
    <div
      className="h-[1200px] max-w-[565.59px] overflow-x-clip overflow-y-auto relative shrink-0 w-[565.59px]"
      data-name="Container"
    >
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
      <Link8 />
      <Link9 />
    </div>
  );
}

function Container43() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start max-w-[570.4px] order-2 p-0 shrink-0 sticky top-0 w-[565.59px]"
      data-name="Container"
    >
      <div
        className="h-6 max-w-[565.59px] shrink-0 w-full"
        data-name="Rectangle"
      />
      <LinkMargin />
      <Container42 />
    </div>
  );
}

function Photo1507652313519D4E9174996Dd() {
  return (
    <div
      className="[background-size:100%_100%] bg-[0%_50.04%] bg-no-repeat h-[886.92px] max-w-[1330.39px] rounded-lg shrink-0 w-[1330.39px]"
      data-name="photo-1507652313519-d4e9174996dd"
      style={{ backgroundImage: `url('${imgPhoto1507652313519D4E9174996Dd}')` }}
    />
  );
}

function Container44() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[1330.39px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">/01</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[1330.39px] p-0 relative shrink-0"
      data-name="Heading 1"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[24px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Casablanco</p>
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div
      className="box-border content-stretch flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-start justify-center leading-[0] max-w-[1330.39px] p-0 relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          Casablanco is a California-based furniture maker crafting sculptural
          pieces at the intersection of architecture and luxury. We partnered
          with their team on a full rebrand — evolving
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          their visual identity and digital presence while keeping the brand’s
          core rooted in timeless design.
        </p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div
      className="bg-[#212121] box-border content-stretch flex flex-col items-start justify-start max-w-[1330.39px] p-[16px] relative rounded-lg shrink-0 w-[1330.39px]"
      data-name="Background"
    >
      <Container44 />
      <div
        className="h-3 max-w-[1330.39px] shrink-0 w-full"
        data-name="Rectangle"
      />
      <Heading1 />
      <div
        className="h-3 max-w-[1330.39px] shrink-0 w-full"
        data-name="Rectangle"
      />
      <Paragraph9 />
    </div>
  );
}

function Container45() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[1330.39px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">/02</p>
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[1330.39px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[24px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Process</p>
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div
      className="box-border content-stretch flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-start justify-center leading-[0] max-w-[1330.39px] p-0 relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          We began by stripping the brand back to its foundations. The previous
          identity leaned heavily on ornament — we replaced it with structural
          elegance, minimal type, and a calming,
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          sun-washed palette.
        </p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div
      className="bg-[#212121] box-border content-stretch flex flex-col items-start justify-start max-w-[1330.39px] p-[16px] relative rounded-lg shrink-0 w-[1330.39px]"
      data-name="Background"
    >
      <Container45 />
      <div
        className="h-3 max-w-[1330.39px] shrink-0 w-full"
        data-name="Rectangle"
      />
      <Heading12 />
      <div
        className="h-3 max-w-[1330.39px] shrink-0 w-full"
        data-name="Rectangle"
      />
      <Paragraph10 />
    </div>
  );
}

function Container46() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[661.19px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">/03</p>
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[629.19px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[24px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">What we did</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[629.19px] p-0 relative shrink-0"
      data-name="Heading 3"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Brand strategy</p>
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[629.19px] p-0 relative shrink-0"
      data-name="Heading 3"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Art direction</p>
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[629.19px] p-0 relative shrink-0"
      data-name="Heading 3"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Web design</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start max-w-[629.19px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading3 />
      <div
        className="bg-[#616161] h-[0.5px] max-w-[629.19px] shrink-0 w-full"
        data-name="Horizontal Divider"
      />
      <Heading14 />
      <div
        className="bg-[#616161] h-[0.5px] max-w-[629.19px] shrink-0 w-full"
        data-name="Horizontal Divider"
      />
      <Heading15 />
      <div
        className="bg-[#616161] h-[0.5px] max-w-[629.19px] shrink-0 w-full"
        data-name="Horizontal Divider"
      />
    </div>
  );
}

function Container48() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start max-w-[661.19px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading13 />
      <Container47 />
    </div>
  );
}

function Background2() {
  return (
    <div
      className="bg-[#212121] max-w-[661.19px] relative rounded-lg shrink-0 w-full"
      data-name="Background"
    >
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start max-w-inherit p-[16px] relative w-full">
          <Container46 />
          <div
            className="h-3 max-w-[661.19px] shrink-0 w-full"
            data-name="Rectangle"
          />
          <Container48 />
          <div
            className="h-3 max-w-[661.19px] shrink-0 w-full"
            data-name="Rectangle"
          />
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start max-w-[661.195px] p-0 relative shrink-0 w-[661.19px]"
      data-name="Container"
    >
      <Background2 />
    </div>
  );
}

function Container50() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[661.19px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">/04</p>
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[629.19px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[24px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Tools we used</p>
      </div>
    </div>
  );
}

function Heading17() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[629.19px] p-0 relative shrink-0"
      data-name="Heading 3"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Figma</p>
      </div>
    </div>
  );
}

function Heading18() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[629.19px] p-0 relative shrink-0"
      data-name="Heading 3"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Illustrator</p>
      </div>
    </div>
  );
}

function Heading19() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[629.19px] p-0 relative shrink-0"
      data-name="Heading 3"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Framer</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start max-w-[629.19px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading17 />
      <div
        className="bg-[#616161] h-[0.5px] max-w-[629.19px] shrink-0 w-full"
        data-name="Horizontal Divider"
      />
      <Heading18 />
      <div
        className="bg-[#616161] h-[0.5px] max-w-[629.19px] shrink-0 w-full"
        data-name="Horizontal Divider"
      />
      <Heading19 />
      <div
        className="bg-[#616161] h-[0.5px] max-w-[629.19px] shrink-0 w-full"
        data-name="Horizontal Divider"
      />
    </div>
  );
}

function Container52() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start max-w-[661.19px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading16 />
      <Container51 />
    </div>
  );
}

function Background3() {
  return (
    <div
      className="bg-[#212121] max-w-[661.19px] relative rounded-lg shrink-0 w-full"
      data-name="Background"
    >
      <div className="max-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start max-w-inherit p-[16px] relative w-full">
          <Container50 />
          <div
            className="h-3 max-w-[661.19px] shrink-0 w-full"
            data-name="Rectangle"
          />
          <Container52 />
          <div
            className="h-3 max-w-[661.19px] shrink-0 w-full"
            data-name="Rectangle"
          />
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start max-w-[661.195px] p-0 relative shrink-0 w-[661.19px]"
      data-name="Container"
    >
      <Background3 />
    </div>
  );
}

function Container54() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start max-w-[1330.39px] p-0 relative shrink-0 w-[1330.39px]"
      data-name="Container"
    >
      <Container49 />
      <Container53 />
    </div>
  );
}

function Container55() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[1330.39px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">/05</p>
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[1330.39px] p-0 relative shrink-0"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[24px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Outcome</p>
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div
      className="box-border content-stretch flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal items-start justify-center leading-[0] max-w-[1330.39px] p-0 relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap w-full"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          The rebrand positioned Casablanco as a quiet force in the luxury
          interiors space — helping them secure retail partnerships, elevate
          their showroom experience, and speak to a new
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[normal] text-nowrap whitespace-pre">
          generation of design-led buyers.
        </p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div
      className="bg-[#212121] box-border content-stretch flex flex-col items-start justify-start max-w-[1330.39px] p-[16px] relative rounded-lg shrink-0 w-[1330.39px]"
      data-name="Background"
    >
      <Container55 />
      <div
        className="h-3 max-w-[1330.39px] shrink-0 w-full"
        data-name="Rectangle"
      />
      <Heading20 />
      <div
        className="h-3 max-w-[1330.39px] shrink-0 w-full"
        data-name="Rectangle"
      />
      <Paragraph11 />
    </div>
  );
}

function Photo1622020886177239Ee6E69B39() {
  return (
    <div
      className="[background-size:100%_100%] bg-[0%_50.04%] bg-no-repeat h-[886.92px] max-w-[1330.39px] rounded-lg shrink-0 w-[1330.39px]"
      data-name="photo-1622020886177-239ee6e69b39"
      style={{ backgroundImage: `url('${imgPhoto1622020886177239Ee6E69B39}')` }}
    />
  );
}

function Photo1616952391192D8Bc85De60D9() {
  return (
    <div
      className="[background-size:100%_100%] bg-[0%_49.78%] bg-no-repeat h-[1662.98px] max-w-[1330.39px] rounded-lg shrink-0 w-[1330.39px]"
      data-name="photo-1616952391192-d8bc85de60d9"
      style={{ backgroundImage: `url('${imgImage}')` }}
    />
  );
}

function Container56() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-center justify-start max-w-[1330.4px] order-1 p-0 relative shrink-0 w-[1330.39px]"
      data-name="Container"
    >
      <div
        className="h-6 max-w-[1330.39px] shrink-0 w-[1330.39px]"
        data-name="Rectangle"
      />
      <Photo1507652313519D4E9174996Dd />
      <Background />
      <Background1 />
      <Container54 />
      <Background4 />
      <Photo1622020886177239Ee6E69B39 />
      <Photo1616952391192D8Bc85De60D9 />
    </div>
  );
}

function Container57() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row-reverse gap-2 grow items-start justify-start max-w-[1904px] min-h-px min-w-px p-0 relative shrink-0 w-[1904px]"
      data-name="Container"
    >
      <Container43 />
      <Container56 />
    </div>
  );
}

function LinkMargin1() {
  return (
    <div
      className="h-8 max-w-[1904px] shrink-0 w-[1904px]"
      data-name="Link:margin"
    />
  );
}

function Container58() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[936px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Instagram</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[936px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Linkedin</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start max-w-[936px] min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <Container58 />
      <Container59 />
    </div>
  );
}

function Container61() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[202.13px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#eeeeee] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          studiokollektiv@contact.com
        </p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9e9e9e] text-[12px] text-left text-nowrap">
        <p className="block leading-[12px] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start max-w-[97.28px] p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[22.4px] whitespace-pre">L.A | U.S.A.</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-center max-w-[202.13px] p-0 relative shrink-0"
      data-name="Container"
    >
      <Container62 />
      <Container63 />
    </div>
  );
}

function Container65() {
  return (
    <div
      className="max-w-[202.13px] relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-row items-center max-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between max-w-inherit pl-0 pr-[0.01px] py-0 relative w-full">
          <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">©2025</p>
          </div>
          <Container64 />
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-px items-start justify-start max-w-[936px] p-0 relative shrink-0"
      data-name="Container"
    >
      <Container61 />
      <Container65 />
    </div>
  );
}

function Container67() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-between max-w-[936px] min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Red_Hat_Display:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#9e9e9e] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          Creativity never sleeps.
        </p>
      </div>
      <Container66 />
    </div>
  );
}

function Container68() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between max-w-[1904px] p-0 relative shrink-0 w-[1872px]"
      data-name="Container"
    >
      <Container60 />
      <Container67 />
    </div>
  );
}

function Footer() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-center justify-start max-w-[1904px] px-4 py-0 relative shrink-0 w-[1904px]"
      data-name="Footer"
    >
      <div
        className="h-12 max-w-[1904px] shrink-0 w-[1872px]"
        data-name="Rectangle"
      />
      <Container68 />
      <div
        className="bg-[#616161] h-[0.5px] max-w-[1904px] shrink-0 w-[1872px]"
        data-name="Horizontal Divider"
      />
    </div>
  );
}

function Main() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center max-w-[1920px] p-0 relative shrink-0 w-full"
      data-name="Main"
    >
      <Container57 />
      <LinkMargin1 />
      <Footer />
    </div>
  );
}

function Background5() {
  return (
    <div
      className="basis-0 bg-[#0f0f0f] grow max-w-[1920px] min-h-[1200px] min-w-px relative self-stretch shrink-0"
      data-name="Background"
    >
      <div className="flex flex-col items-center max-w-inherit min-h-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-start max-w-inherit min-h-inherit px-2 py-10 relative size-full">
          <Main />
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-center min-h-[1200px] p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Background5 />
    </div>
  );
}

export default function Project() {
  return (
    <div
      className="bg-[#0f0f0f] bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="project"
    >
      <Container69 />
    </div>
  );
}