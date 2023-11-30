

const ContactUs = () => {
    return (
        <div className="my-5">
            We value your inquiries and are here to assist you. Whether you have questions about our diagnostic services, want to schedule an appointment, or need assistance with any aspect of our offerings, our dedicated team is ready to help. You can reach us through the provided contact information below, and we wll make every effort to respond promptly. customer satisfaction is our priority, and we look forward to providing you with the support you need. Your health and well-being matter to us, and we appreciate the opportunity to serve you. Feel free to connect with us, we are here to listen, assist, and ensure your experience with our services is seamless and positive.
            <h2 className="text-center font-semibold text-xl my-5">Contact Info</h2>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" checked="checked" />
                <div className="collapse-title text-xl font-medium">
                    Email
                </div>
                <div className="collapse-content">
                    <p>smartcare@gmail.com</p>
                </div>
            </div>
            <div className="collapse my-5 collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    Phone
                </div>
                <div className="collapse-content">
                    <p>018********</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    WhatsApp
                </div>
                <div className="collapse-content">
                    <p>018********</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;