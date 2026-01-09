function About() {
  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        About the Project
      </h2>

      <p className="text-lg mb-4">
        This project is an AI-based Crop Selling Assistant developed
        to support farmers of Uttarakhand.
      </p>

      <p className="text-lg mb-4">
        Farmers can enter crop details such as crop name, quantity,
        and location. The AI chatbot then suggests nearby markets
        and mandis to help farmers earn maximum profit.
      </p>

      <p className="text-lg mb-4">
        The system securely uses OpenAI API in the backend, ensuring
        data security and reliable responses.
      </p>

      <p className="text-lg">
        This project aims to reduce middlemen dependency and digitally
        empower farmers.
      </p>
    </div>
  );
}

export default About;
