import InputFormat from "./inputfiles/inputFormat"
import InputLanguage from "./inputfiles/inputLanguage";


const InputOutputBox = () => {
  return (
    <div className="w-full h-full bg-gray p-lg">
      <div className=" flex flex-row gap-md p-[20px]">
        <InputFormat />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="bg-gray"
          fill="bg-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5 6.85714L4.5 6.85714M4.5 6.85714L8.59091 10.7143M4.5 6.85714L8.59091 3M4.5 17.1429L19.5 17.1429M19.5 17.1429L15.4091 21M19.5 17.1429L15.4091 13.2857"
            stroke="#0A0A0A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <InputFormat />
      </div>
      <div className="h-[600px] max-w-[1200px] mx-auto bg-white rounded-[1.3rem]">
        <div className="flex flex-row justify-evenly p-md bg-white">
          <InputLanguage />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="bg-white rounded-full outline outline-1 text-gray-20"
            fill="bg-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 6.85714L4.5 6.85714M4.5 6.85714L8.59091 10.7143M4.5 6.85714L8.59091 3M4.5 17.1429L19.5 17.1429M19.5 17.1429L15.4091 21M19.5 17.1429L15.4091 13.2857"
              stroke="#0A0A0A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <InputLanguage />
        </div>
        <hr />
        <div className="grid grid-cols-2 divide-x p-sm h-[500px] divide-opacity-10">
          <div className="flex align-middle justify-center items-center">
            <svg
              width="88"
              height="120"
              viewBox="0 0 88 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.1"
                d="M43.6364 76.3636C49.4229 76.3636 54.9724 74.0649 59.0641 69.9732C63.1558 65.8815 65.4545 60.332 65.4545 54.5455V21.8182C65.4545 16.0316 63.1558 10.4821 59.0641 6.3904C54.9724 2.2987 49.4229 0 43.6364 0C37.8498 0 32.3003 2.2987 28.2086 6.3904C24.1169 10.4821 21.8182 16.0316 21.8182 21.8182V54.5455C21.8182 60.332 24.1169 65.8815 28.2086 69.9732C32.3003 74.0649 37.8498 76.3636 43.6364 76.3636ZM32.7273 21.8182C32.7273 18.9249 33.8766 16.1501 35.9225 14.1043C37.9683 12.0584 40.7431 10.9091 43.6364 10.9091C46.5296 10.9091 49.3044 12.0584 51.3502 14.1043C53.3961 16.1501 54.5454 18.9249 54.5454 21.8182V54.5455C54.5454 57.4387 53.3961 60.2135 51.3502 62.2593C49.3044 64.3052 46.5296 65.4545 43.6364 65.4545C40.7431 65.4545 37.9683 64.3052 35.9225 62.2593C33.8766 60.2135 32.7273 57.4387 32.7273 54.5455V21.8182ZM87.2727 54.5455C87.2727 53.0988 86.698 51.7114 85.6751 50.6885C84.6522 49.6656 83.2648 49.0909 81.8182 49.0909C80.3715 49.0909 78.9841 49.6656 77.9612 50.6885C76.9383 51.7114 76.3636 53.0988 76.3636 54.5455C76.3636 63.2253 72.9156 71.5496 66.778 77.6871C60.6405 83.8247 52.3162 87.2727 43.6364 87.2727C34.9565 87.2727 26.6322 83.8247 20.4947 77.6871C14.3571 71.5496 10.9091 63.2253 10.9091 54.5455C10.9091 53.0988 10.3344 51.7114 9.31149 50.6885C8.28856 49.6656 6.90118 49.0909 5.45454 49.0909C4.00791 49.0909 2.62053 49.6656 1.5976 50.6885C0.574675 51.7114 0 53.0988 0 54.5455C0.00963159 65.1671 3.89303 75.4205 10.9222 83.3835C17.9513 91.3465 27.6435 96.4723 38.1818 97.8V109.091H27.2727C25.8261 109.091 24.4387 109.666 23.4158 110.689C22.3929 111.711 21.8182 113.099 21.8182 114.545C21.8182 115.992 22.3929 117.379 23.4158 118.402C24.4387 119.425 25.8261 120 27.2727 120H60C61.4466 120 62.834 119.425 63.8569 118.402C64.8799 117.379 65.4545 115.992 65.4545 114.545C65.4545 113.099 64.8799 111.711 63.8569 110.689C62.834 109.666 61.4466 109.091 60 109.091H49.0909V97.8C59.6292 96.4723 69.3214 91.3465 76.3505 83.3835C83.3797 75.4205 87.2631 65.1671 87.2727 54.5455Z"
                fill="#333333"
              />
            </svg>
          </div>
          <div className="flex align-middle justify-center items-center">
            <svg
              width="121"
              height="96"
              viewBox="0 0 121 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.1"
                d="M62.8102 0.493178C61.8395 0.0716988 60.7748 -0.0837365 59.7247 0.0427346C58.6746 0.169206 57.6767 0.573054 56.833 1.21306L28.2619 23.8894H6.44499C4.85974 23.8894 3.33941 24.5214 2.21846 25.6465C1.09751 26.7715 0.467773 28.2974 0.467773 29.8884V65.8826C0.467773 67.4736 1.09751 68.9995 2.21846 70.1246C3.33941 71.2496 4.85974 71.8816 6.44499 71.8816H28.2619L56.5341 94.558C57.5857 95.4048 58.8917 95.8699 60.24 95.8778C61.1328 95.8926 62.0155 95.6865 62.8102 95.2779C63.8273 94.7916 64.6869 94.0268 65.2897 93.0715C65.8925 92.1163 66.214 91.0095 66.2172 89.8787V5.89231C66.214 4.76157 65.8925 3.65476 65.2897 2.69949C64.6869 1.74422 63.8273 0.979392 62.8102 0.493178ZM54.2628 77.4007L34.0598 61.2034C33.0081 60.3565 31.7021 59.8914 30.3539 59.8836H12.4222V35.8875H30.3539C31.7021 35.8796 33.0081 35.4145 34.0598 34.5677L54.2628 18.3703V77.4007ZM106.025 13.931C104.9 12.8014 103.373 12.1667 101.782 12.1667C100.19 12.1667 98.6634 12.8014 97.5378 13.931C96.4123 15.0606 95.78 16.5928 95.78 18.1903C95.78 19.7879 96.4123 21.32 97.5378 22.4496C101.058 25.9767 103.808 30.2 105.614 34.8511C107.42 39.5023 108.242 44.4797 108.029 49.4669C107.815 54.4542 106.57 59.3424 104.373 63.8209C102.176 68.2993 99.0748 72.2701 95.2665 75.4811C94.3416 76.2747 93.6801 77.3329 93.3705 78.514C93.0608 79.6951 93.1177 80.9429 93.5335 82.0907C93.9494 83.2385 94.7044 84.2316 95.6977 84.9372C96.6909 85.6428 97.8751 86.0273 99.0919 86.0394C100.489 86.0421 101.842 85.5539 102.917 84.6596C108.004 80.384 112.148 75.093 115.086 69.1229C118.025 63.1528 119.693 56.6343 119.985 49.982C120.278 43.3297 119.187 36.6891 116.784 30.4826C114.381 24.2761 110.717 18.6394 106.025 13.931ZM89.11 30.9083C88.5527 30.3489 87.891 29.9052 87.1629 29.6025C86.4347 29.2998 85.6543 29.144 84.8661 29.144C84.078 29.144 83.2976 29.2998 82.5694 29.6025C81.8412 29.9052 81.1796 30.3489 80.6223 30.9083C80.065 31.4676 79.6229 32.1316 79.3213 32.8624C79.0197 33.5933 78.8645 34.3765 78.8645 35.1676C78.8645 35.9586 79.0197 36.7419 79.3213 37.4727C79.6229 38.2035 80.065 38.8675 80.6223 39.4269C82.8673 41.6666 84.1355 44.7086 84.1489 47.8855C84.1503 49.6333 83.7712 51.3603 83.0382 52.9458C82.3051 54.5312 81.2358 55.9367 79.905 57.064C79.2998 57.5676 78.7995 58.1861 78.4328 58.8841C78.0661 59.5821 77.8401 60.3458 77.768 61.1315C77.6958 61.9173 77.7788 62.7096 78.0121 63.4631C78.2455 64.2166 78.6247 64.9165 79.128 65.5227C79.634 66.1258 80.2535 66.6228 80.951 66.9855C81.6486 67.3481 82.4105 67.5691 83.1933 67.636C83.976 67.7029 84.7642 67.6142 85.5128 67.3751C86.2613 67.136 86.9556 66.7512 87.5559 66.2426C90.2284 63.9936 92.3783 61.1851 93.8548 58.0139C95.3314 54.8428 96.0988 51.3858 96.1033 47.8855C96.0695 41.5272 93.5597 35.4342 89.11 30.9083Z"
                fill="#333333"
              />
            </svg>
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-between p-sm">
          <div className="">1</div>
          <div className="">2</div>
        </div>
      </div>
    </div>
  );
}

export default InputOutputBox