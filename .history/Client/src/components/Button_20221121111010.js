import { memo } from 'react';

const Button = ({ text, textColor, bgColor, textDecoration, IcAfter, onClick, fullWidth, px }) => {
      console.log('re-render');
      return (
            <button
                  type="button"
                  className={`py-2 ${px ? px : 'px-2'} ${textColor} ${bgColor} ${textDecoration} ${
                        fullWidth && 'w-full'
                  } outline-none rounded-md hover:underline flex items-center justify-center leading-5 cursor-pointer gap-1`}
                  onClick={onClick}
            >
                  <span> {text}</span>
                  <span>{IcAfter && <IcAfter />}</span>
            </button>
      );
};

export default memo(Button);
