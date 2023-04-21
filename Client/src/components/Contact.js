import { text } from '../utils/dataContact';
import { Button } from '../components';

const Contact = () => {
    return (
        <div className="bg-white mt-8 rounded-md shadow-md p-4 max-w-1100 w-full flex flex-col justify-center items-center gap-6">
            <img src={text.image} alt="thumbnail" className="w-full h-48 object-contain" />
            <p>{text.content}</p>
            <div className="flex items-center justify-around w-full">
                {text.contacts.map((item, index) => {
                    return (
                        <div key={index} className="flex flex-col items-center justify-center">
                            <span className="text-orange-500 font-semibold">{item.text}</span>
                            <span className="text-blue-900 lg:text-[24px] text-[18px] font-semibold">{item.phone}</span>
                            <span className="text-blue-900 lg:text-[24px] text-[18px]  font-semibold">{item.zalo}</span>
                        </div>
                    );
                })}
            </div>
            <Button text="Gửi liên hệ" bgColor="bg-blue-600" textColor="text-white" px="px-6" />
        </div>
    );
};

export default Contact;
