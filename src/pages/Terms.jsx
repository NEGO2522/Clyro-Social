import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';

const Terms = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
            <p className="mt-2 text-blue-100">Last Updated: September 24, 2025</p>
          </div>

          {/* Content */}
          <div className="px-6 py-8 md:px-10">
            <p className="text-gray-700 mb-8 leading-relaxed">
              Welcome to Clyro! By using our app, you agree to the following terms. Please read them carefully.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  Using Our Service
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    You must be at least 13 years old to use this app.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    You are responsible for any activity that happens under your account.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Do not use the app for illegal, harmful, or abusive activities.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  Event Pages
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Event organizers can create event pages.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Participants can post photos, videos, and other content to events.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Event pages may be public (anyone can view) or private (invite-only).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                  Your Content
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    You own the rights to the content you upload.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    By posting, you give Clyro permission to display your content inside the app and use it for improving our service.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Do not upload anything illegal, copyrighted without permission, or offensive.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                  Privacy
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Your data is stored securely using Firebase.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Some content may be visible to the public depending on event settings.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Please check event privacy before posting.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</span>
                  Our Rights
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    We may remove content or suspend accounts that break these terms.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    We may update these terms at any time. Users will be notified of major changes.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">6</span>
                  Limitation of Liability
                </h2>
                <ul className="space-y-3 text-gray-700 pl-11">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    We are not responsible for what users post.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    We do not guarantee that event content will always be available.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Use the app at your own risk.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">7</span>
                  Contact
                </h2>
                <div className="bg-blue-50 rounded-lg p-4 pl-11">
                  <p className="text-gray-700 mb-2">For questions about these Terms, contact us at:</p>
                  <a 
                    href="mailto:nextgenova28@gmail.com" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <FaEnvelope className="mr-2" />
                    nextgenova28@gmail.com
                  </a>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Clyro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;