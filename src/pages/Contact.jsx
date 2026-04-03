import React from 'react';
import { Button, Label, TextInput, Textarea, Card } from 'flowbite-react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-white dark:bg-gray-900 mt-10">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Have questions or need assistance? Our support team is here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-4 md:p-8 border shadow-xl bg-white dark:bg-gray-800">
            <form className="flex flex-col gap-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your Name" />
                </div>
                <TextInput id="name" type="text" placeholder="John Doe" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your Email" />
                </div>
                <TextInput id="email" type="email" placeholder="name@flowbite.com" required icon={Mail} />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="subject" value="Subject" />
                </div>
                <TextInput id="subject" type="text" placeholder="How can we help?" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="message" value="Your Message" />
                </div>
                <Textarea id="message" placeholder="Leave a comment..." required rows={4} />
              </div>
              <Button color="blue" type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Info & Map Placeholder */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-600 dark:text-gray-400">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">support@penoramahotel.com</p>
                  <p className="text-gray-600 dark:text-gray-400">info@penoramahotel.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">123 Luxury Avenue, Suite 456</p>
                  <p className="text-gray-600 dark:text-gray-400">Paradise City, PC 78901</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.4734000215!2d-0.24168144921875002!3d51.52877184921875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sbd!4v1714041133099!5m2!1sen!2sbd" 
                className="w-full h-full border-none"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
