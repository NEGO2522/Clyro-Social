import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 font-['Poppins']">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-white hover:text-blue-100 mb-4 transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
            <p className="mt-2 text-blue-100">Last Updated: September 24, 2025</p>
          </div>

          {/* Content */}
          <div className="px-6 py-8 md:px-10">
            <p className="text-gray-700 mb-8 leading-relaxed">
              Clyro ("we," "our," or "us") values your privacy. This policy explains how we collect, use, and protect your information when you use our app.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  Information We Collect
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <strong>Account Info:</strong> Name, email, and login details (via Firebase Auth).
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <strong>Content:</strong> Photos, videos, and posts you upload to events.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <strong>Event Data:</strong> Event names, dates, and participation details.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <strong>Usage Data:</strong> Basic app analytics (how you use the app).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  How We Use Your Information
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    To let you create and join event pages.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    To display your content within events.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    To improve our app and user experience.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    To keep the app secure and prevent abuse.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                  Sharing of Information
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <strong>Public Events:</strong> Content posted to public events is visible to anyone in the app.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <strong>Private Events:</strong> Content is only visible to invited participants.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    We do not sell or rent your personal data.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    We may share limited information if required by law.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                  Data Storage & Security
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    We use Firebase services to store account data, posts, and media.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    We take reasonable steps to keep your data safe but cannot guarantee 100% security.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</span>
                  Your Choices
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    You can edit or delete your posts at any time.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    You may request deletion of your account and personal data by contacting us.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">6</span>
                  Children's Privacy
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Users must be at least 13 years old.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    We do not knowingly collect data from children under 13.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">7</span>
                  Changes to this Policy
                </h2>
                <p className="text-gray-700 pl-11">
                  We may update this Privacy Policy from time to time. Major changes will be notified in the app.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">8</span>
                  Contact Us
                </h2>
                <div className="flex items-center text-gray-700 pl-11">
                  <FaEnvelope className="text-blue-500 mr-2" />
                  <a href="mailto:nextgenova28@gmail.com" className="text-blue-600 hover:underline">
                    nextgenova28@gmail.com
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;