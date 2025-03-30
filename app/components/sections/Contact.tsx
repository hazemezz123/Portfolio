"use client";

import { m } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Use EmailJS to send form
    try {
      // Make sure you replace these with your actual EmailJS service ID, template ID, and public key
      const serviceId =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 retro-container">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="retro-header inline-block text-3xl font-bold mb-4 px-6 py-2">
            <span className="text-retro-purple">CONTACT</span>{" "}
            <span className="text-retro-gray">ME</span>
          </h2>
          <div className="w-24 h-1 bg-retro-green mx-auto"></div>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="retro-container p-6"
          >
            <h3 className="text-xl font-bold text-retro-gray mb-6">
              <span className="text-retro-blue">GET</span> IN TOUCH
            </h3>

            <p className="text-retro-gray mb-8 border-l-4 border-retro-purple pl-4">
              Have a project in mind or just want to say hello? Feel free to
              drop me a message using the form. I&apos;ll get back to you as
              soon as possible!
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-retro-gray flex items-center justify-center mr-4">
                  <span className="text-retro-beige text-xl">@</span>
                </div>
                <div>
                  <h4 className="text-retro-purple font-bold">Email</h4>
                  <p className="text-retro-gray">hazemezz988@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-retro-gray flex items-center justify-center mr-4">
                  <span className="text-retro-beige text-xl">!</span>
                </div>
                <div>
                  <h4 className="text-retro-blue font-bold">LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/in/hazem-ezz-424498285"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-retro-gray hover:text-retro-blue"
                  >
                    Hazem Ezz
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-retro-gray flex items-center justify-center mr-4">
                  <span className="text-retro-beige text-xl">*</span>
                </div>
                <div>
                  <h4 className="text-retro-green font-bold">Phone</h4>
                  <p className="text-retro-gray">+20 1005291205</p>
                </div>
              </div>

              <div className="flex items-start mt-4">
                <div className="flex-shrink-0 w-12 h-12 bg-retro-gray flex items-center justify-center mr-4">
                  <span className="text-retro-beige text-xl">#</span>
                </div>
                <div>
                  <h4 className="text-retro-orange font-bold">GitHub</h4>
                  <a
                    href="https://github.com/hazemezz123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-retro-gray hover:text-retro-blue"
                  >
                    hazemezz123
                  </a>
                </div>
              </div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="retro-container p-6"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-retro-gray font-bold mb-2"
                >
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="retro-input w-full p-3 bg-retro-beige border-2 border-retro-gray text-retro-gray"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-retro-gray font-bold mb-2"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="retro-input w-full p-3 bg-retro-beige border-2 border-retro-gray text-retro-gray"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-retro-gray font-bold mb-2"
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="retro-input w-full p-3 bg-retro-beige border-2 border-retro-gray text-retro-gray"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="retro-button font-bold text-white px-6 py-3 w-full"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>

              {submitStatus === "success" && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-retro-green text-white text-center"
                >
                  Message sent successfully!
                </m.div>
              )}

              {submitStatus === "error" && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-red-500 text-white text-center"
                >
                  Failed to send message. Please try again.
                </m.div>
              )}
            </form>
          </m.div>
        </div>
      </div>
    </section>
  );
}
