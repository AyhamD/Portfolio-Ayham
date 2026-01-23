import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import Input from "../../shared/Input/Input";
import Textarea from "../../shared/TextArea/TextArea";
import Button from "../../shared/Button/Button";
import { useTranslation } from "react-i18next";
import { ContactFormData, ContactFormProps } from "../../interface/contact";


const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const email = "ayhamdarwish1993@email.com";

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <section id="contact" className="container mx-auto py-12 md:py-24 lg:py-32">
      <div className="px-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("contact")}</h2>
        <p className="mt-4 text-muted-foreground">{t("contact_view.contact_header")}</p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder={t("contact_view.name")}
              required
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder={t("contact_view.email")}
              required
              onChange={handleChange}
            />
            <Textarea
              name="message"
              placeholder={t("contact_view.message")}
              required
              onChange={handleChange}
            />
            <Button type="submit" className="bg-primary">
              {t("contact_view.send_message")}
            </Button>
          </form>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="h-6 w-6 text-primary" />
            <span className="text-muted-foreground">+46 72-728 90 62</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleEmailClick}>
            <CiMail className="h-6 w-6 text-primary" />
            <span className="text-muted-foreground">{email}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
