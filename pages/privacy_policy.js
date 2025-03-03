import React from "react";
import Logo from "@/public/icon/primarylogo.svg";
import Image from "next/image";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="w-full px-10 py-5 md:pt-5  md:p-40 h-full">
      <div className="flex flex-col items-center w-full justify-center py-20 h-full">
        <Link href={"/"}>
          <Image src={Logo} width={150} alt={"African Proverb Logo"} />
        </Link>
      </div>
      <h2 className="text-5xl">Privacy Policy</h2>

      <p className="text-2xl mt-10">
        This Policy was last reviewed and updated on:{" "}
        <span className="font-bold">1st of June 2024</span>
      </p>

      <p className="text-md mb-5 text-justify">
        As noted in the policy below, the English language version of the Privacy Policy and Terms of Use will govern your relationship with African Proverbs. While the English version will govern, you can also use an automatic translation tool like Google Translate to view the documents in your language.
      </p>
      <p className="text-md mb-5 text-justify">
        The African Proverbs App “The App” is an application service that compiles and translates African Proverbs across the continent of Africa explaining the wisdom and telling the stories behind the proverbs. These explanations can be accessed in written form or through visual aids.
        Whereas most of our services are delivered free of charge, paid subscription is available for users that want to limit the amount of advertisement traffic they encounter on the App.
        Please read this Privacy Policy carefully because it discusses how we will collect, use, share, and process your personal information.
      </p>

      <h2 className="text-2xl my-10 font-bold">Brief Overview</h2>

      <p className="text-md mb-5 text-justify">
        By accessing the African Proverbs App, you agree to this Privacy Policy and its terms and consent to having your data transferred to and processed in Canada, Germany, The United States, and Nigeria.
        Here’s a summary of what you can expect to find in our Privacy Policy, which covers all the App’s branded products and services:
      </p>
      <h2 className="text-xl my-5 font-bold">Your Personal Information: How We Collect, Use and Share It
      </h2>
      <p className="text-md mb-5 text-justify">
        Below is a brief overview of the personal information collected on the African Proverbs App and the purpose for our collection. Please note, however, that our processing of your information depends on the information you choose to provide and the functionality of our services you choose to use. A more detailed description of our processing of your information is found below.
      </p>
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Type of Personal Information</th>
                <th className="px-4 py-3">Nature and Purpose for Collection</th>
              </tr>
            </thead>
            <tbody className="bg-whit">
              <tr className="text-gray-700">
                <td className="w-1/2 px-4 py-3 border">
                  Personal Identifiers (name, aliases, Internet Protocol address, email address, address, and similar identifiers)
                </td>
                <td className="w-1/2 px-4 py-3 text-ms border">Collected to the extent you provide it to us to create an account or for association with your account in order to ensure proper use and authentication for your account.
                  Your personal information is also used to contact you in connection with your requests and account and as discussed in our Privacy Policy. </td>
              </tr>
              <tr className="text-gray-700">
                <td className="w-1/2 px-4 py-3 border">
                  Financial information (credit card information, banking information, and similar information)                </td>
                <td className="w-1/2 px-4 py-3 text-ms  border">
                  Collected to the extent you purchase the subscription option on the App. Financial information provided to us may also be processed by third party service providers as discussed in our Privacy Policy.
                </td>
              </tr>
              <tr className="text-gray-700">
                <td className="w-1/2 px-4 py-3 border">
                  Internet or other network activity (browsing history, search history, information on your interaction with our websites, apps, and other services)
                </td>
                <td className="w-1/2 px-4 py-3 text-ms border">
                  Collected as you use our sites and services in order to monitor and ensure the proper operation of our websites, apps and services, to improve and customize your experience with regard to the same, to improve, modify, and update our services and content generally, and to analyze the same internally, and provide de-identified statistical information to third parties                </td>
              </tr>
              <tr className="text-gray-700">
                <td className="w-1/2 px-4 py-3 border">
                  Geolocation data (physical location or movements)
                </td>
                <td className="w-1/2 px-4 py-3 text-ms border">
                  Collected if you choose to use location-based functionality of our services. We may also need this to meet geographical requirements in our agreements with third parties.                       </td>
              </tr>
              <tr className="text-gray-700">
                <td className="w-1/2 px-4 py-3 border">
                  Inferences we make about our users based on data available to us.
                </td>
                <td className="w-1/2 px-4 py-3 text-ms border">
                  Collected as you use our sites and services in order to improve and customize your experience with regard to our services and to suggest additional functionality and services.                              </td>
              </tr>



            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl my-5 font-bold">How we use your data to make your African Proverbs experience more personal.</h2>

      <p className="text-md mb-5 text-justify">
        This Privacy Policy outlines the types of data we collect from your interaction with the App, as well as how we process that information to enhance your African Proverbs experience. When you create an African Proverbs App account or use any one of our applications or sites, the information we collect is for the purpose of offering a more personalized experience.
      </p>
      <h2 className="text-xl my-5 font-bold">
        Your privacy protected.
      </h2>

      <p className="text-md mb-5 text-justify">
        We take the privacy of the information you provide and that we collect seriously and we implement security safeguards designed to protect your data.       </p>
      <h2 className="text-xl my-5 font-bold">It’s your experience.</h2>

      <p className="text-md mb-5 text-justify">
        You will make choices about our use and processing of your information when you first engage African Proverbs App and when you engage certain African Proverbs App functionality.      </p>

      <h2 className="text-xl my-5 font-bold">We welcome your questions and comments.</h2>

      <p className="text-md mb-5 text-justify">
        We welcome any questions or comments you may have about this Privacy Policy and our privacy practices.
        If you have any questions or comments, you may contact us at {""}
        <a
          href="mailto:contact@calmglobal.com"
          className="underline text-blue-500"
        >
          contact@calmglobal.com
        </a> Attention: Head of Client Engagement.
        Where the African Proverbs App has provided you with a translation other than the English language version of the Privacy Policy, then you agree that the translation is provided for your convenience only and that the English language version of the Privacy Policy will govern your relationship with us. If there is any contradiction between what the English language version of the Privacy Policy says and what a translation says, then the English language version shall take precedence.
      </p>

      <h2 className="text-2xl my-10 font-bold">
        Information We Collect and How We Collect It
      </h2>

      <p className="text-md mb-5 text-justify">
        The information we collect depends on the services and functionality you request.
        You may decline to submit personal information to us;
        however, that may prohibit us from having the ability to provide you with certain services or functionality.
        The personal information we collect and the purpose for which we use that information are described below.
      </p>
      <h2 className="text-xl my-5 font-bold">Personal information you provide to us.
      </h2>
      <p className="text-md mb-5 text-justify">
        You do not need to sign up for a subscription account to use the African Proverbs App. However, subscription allows us to reduce the advertisements feeds in your usage of the African Proverbs App and to access certain functionalities within the App. To subscribe, we require that you provide a first name, last name, and a valid email address. We will use this information to associate you with your specific African Proverbs account.
      </p>
      <p className="text-md mb-5 text-justify">
        Beyond the personal information collected to subscribe, you have choices about what additional information you provide to us.
      </p>
      <h2 className="text-xl my-5 font-bold">Communications from you to us.

      </h2>
      <p className="text-md mb-5 text-justify">
        We collect information about you when you send, receive, or engage with messages from us,
        including when you submit personal information or requests by emailing or through the website.
        We retain and use those communications to process your inquiries, respond to your requests,
        and improve the African Proverbs App and our services.
        If you are a subscriber, we will keep your communications to us in association
        with your account for as long as your subscription is active.

      </p>

      <h2 className="text-2xl my-10 font-bold">
        Automatic Data Collection Technologies
      </h2>

      <p className="text-md mb-5 text-justify">
        By agreeing to our Privacy Policy, you agree to the use of cookies and similar technologies
        (for example, web beacons, pixels, tags, and device identifiers, which we collectively refer to as “cookies”)
        as described in this policy. If you use African Proverbs App without changing your browser or device settings to disable cookies,
        we'll assume that you consent to receive all cookies provided through the African Proverbs App.

      </p>
      <h2 className="text-xl my-5 font-bold">Cookies and other similar technologies.

      </h2>
      <p className="text-md mb-5 text-justify">
        We use cookies to recognize you and/or your device(s) on, off, and across the different African Proverbs App platforms. Cookies help to facilitate the best possible user experience as they allow us to recognize you and maintain your user preferences from session to session, help us keep your account safe, and generally improve the functionality of the products and services offered through African Proverbs App. They also help us ensure that subscriber information is used in association with the correct subscription account.
      </p>
      <p className="text-md mb-5 text-justify">
        We use cookies to collect details of your use of the African Proverbs App (including traffic data, IP location data, logs, browser type, browser language, the functionality requested, and the timing of your requests), and other communication data and the resources that you access, and use, on or through African Proverbs App.  We use this information to provide a tailored African Proverbs App experience for you and to communicate with you more effectively. The information is also collected to determine the aggregate number of unique devices using the African Proverbs App and/or parts of African Proverbs App, track total usage, analyze usage data, and improve African Proverbs App functionality for all users. We may combine this information to provide you with a better experience and to improve the quality of our service.
      </p>
      <p className="text-md mb-5 text-justify">
        If you refuse to accept cookies, you may be unable to access certain parts of African Proverbs App, you will prohibit us from delivering the full capability of African Proverbs App, and you may prevent the use of certain features and services that require these technologies.
      </p>
      <p className="text-md mb-5 text-justify">
        African Proverbs App cannot regulate other sites, content, or applications linked or provided from within African Proverbs App or our various other websites and services that are provided by third parties, including your device manufacturer, and your mobile service provider. These third parties may place their own cookies or other files on your computer, collect data, or solicit personal information from you. The information they collect may be associated with your personal information or they may collect
        information, including personal information, about your online activities over time and across different websites, apps, and other online services. These third parties may use this information to provide you with interest-based (behavioral) targeted content. We do not control these third parties' tracking technologies or how they may be used. If you have any questions about targeted content, you should contact the responsible provider directly.
      </p>
      <h2 className="text-xl my-5 font-bold">    Attribution providers.

      </h2>
      <p className="text-md mb-5 text-justify">
        We advertise African Proverbs App on third party sites such as Facebook and Google and use third-party software development kits (“SDKs”) to attribute a download of African Proverbs App to the advertisement placed on the third-party site. We do not sell your personal information to any third parties nor allow our SDK service providers to sell your personal information to third parties or use your personal information to solicit the sale of third-party goods or services. We may provide these third parties with aggregate, de-identified information concerning ads placed on their sites and African Proverbs App downloads that result from those ads.</p>



      <h2 className="text-2xl my-10 font-bold">Device ID, IP address and network access.</h2>

      <p className="text-md mb-5 text-justify">
        When you access or leave African Proverbs App, or its websites, we receive the URL of both the site you came from and the one you go to next. We also get information about your proxy server, operating system, web browser and add-ons, device identifier and features, and/or your Internet Service Provider (“ISP”) or mobile carrier when you use African Proverbs App. We also receive data from your devices and networks, including your IP address.
      </p>
      <p className="text-md mb-5 text-justify">
        We use the IP addresses we collect from our users to process them with public latitude and longitude information related to your ISP or mobile service provider in order to determine, and in some instances depict in an aggregate and de-identified manner, the approximate geographic region for each instance of African Proverbs App use. This latitude and longitude information is stored by us but is never associated with any information about you or that would identify you personally.
      </p>
      <p className="text-md mb-5 text-justify">
        We also collect and use the wireless (or “WiFi”) permissions of your mobile device to determine if you are connected to a WiFi or cellular network. This information is used to provide an optimized user experience by providing higher resolution media to a user who is on a high-speed WiFi connection rather than a cellular network. WiFi permissions are also used for casting content with Chromecast and similar devices.
      </p>
      <h2 className="text-2xl my-5 font-bold">How We Use Your Information.</h2>
      <p className="text-md mb-5 text-justify">
        We use data that we collect about you and that you provide as well as the inferences we make from that information as follows:
      </p>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>
          To provide, support, and personalize African Proverbs App and the African Proverbs App functionality you request;
        </li>
        <li>
          To create, maintain, customize, and secure your African Proverbs App subscription account, if any;
        </li>
        <li>
          To process your requests and respond to your inquiries;
        </li>
        <li>
          To provide information on other products or services;
        </li>
        <li>
          To maintain the safety, security, and integrity of African Proverbs App and the infrastructure that facilitates use of the African Proverbs App;
        </li>
        <li>
          For development and internal analysis;
        </li>
        <li>
          To fulfill any other purpose for which you provide it;
        </li>
        <li>
          To carry out our obligations and enforce our rights, including those under this Privacy Policy;
        </li>
        <li>
          As described in this Privacy Policy;
        </li>
        <li>
          In any other way we may describe when you provide the information; and
        </li>
        <li>
          For any other purpose with your consent.
        </li>

      </ul>


      <h2 className="text-xl my-5 font-bold">Features related to your location.</h2>

      <p className="text-md mb-5 text-justify">
        Some African Proverbs App features use your precise location, if you choose to share it, to provide or suggest content and information. We will use that information solely to provide location-based features, personalize your experience with African Proverbs App and internally analyze and develop our products and services.
      </p>
      <p className="text-md mb-5 text-justify">
        After you first grant us this permission, we will assume we have your consent to process your location in this way until you revoke or limit your permission. You may choose to revoke or limit your permissions for location sharing through the settings of your device.
      </p>
      <p className="text-md mb-5 text-justify">
        If you choose not to share your precise location, some location-related features may not be accessible to you. You will still be able to access and use non-location dependent features of African Proverbs App.
      </p>
      <p className="text-md mb-5 text-justify">
        We share your specific location only with your consent. You may change this permission at any time in your app settings.
      </p>

      <h2 className="text-xl my-5 font-bold">Communications from us to you.</h2>

      <p className="text-md mb-5 text-justify">
        We communicate with you through push notification, email, or in-app messages. If we communicate to you with email, you may generally unsubscribe to these messages via the unsubscribe link in the emails providing these messages. You can also tailor your notification settings at any time within the settings menu of the African Proverbs App.
      </p>
      <h2 className="text-xl my-5 font-bold">Recommendations and Other Communications.</h2>

      <p className="text-md mb-5 text-justify">
        We use the data we have about you and inferences we make from that data to recommend certain content and functionality as well as additional products and services offered through the African Proverbs App.  We may combine the information you provide us with information we collect through other African Proverbs App services and products and the inferences we make from the same for our internal development to improve the overall quality of all services and products provided by African Proverbs App. We may also make recommendations to you for other African Proverbs App services and products based on the information you provide and we infer.
        We may also use the data we have about you and inferences we make from that data to contact you regarding other opportunities to engage with the African Proverbs App. We may contact you through push notification, email, telephone or in-app messages to discuss these recommendations and opportunities and other news.      </p>

      <h2 className="text-xl my-5 font-bold">Security, Legal and Technical Issues.</h2>

      <p className="text-md mb-5 text-justify">
        We may use your information to contact you about account security, legal, and other service-related issues.
        Please be aware that you cannot opt-out of receiving such messages from us. We may use your personal information to investigate, respond to and resolve legal, security, and technical issues and complaints, including, as necessary, security purposes or possible fraud, violations of law or this Privacy Policy, or attempts to harm;
        however, you agree that we have no obligation to prevent or monitor for any of the foregoing.
      </p>
      <h2 className="text-xl my-5 font-bold">Notice.</h2>

      <p className="text-md mb-5 text-justify">
        We may use your personal information to provide notice regarding a security incident or data breach, by:<br />
        (i) sending a message to the email address you provide (as applicable); <br />
        (ii) posting to a publicly facing page of the African Proverbs App or through an in-app message;<br />
        (iii) through major media outlets; and/or<br />
        (iv) telephonic means, including calls and/or text messages, even if sent via automated means including automated dialers.
        Standard text and data messaging rates may apply from your carrier.
        Notices sent by email will be effective when we send the email,
        notices we provide by posting will be effective upon posting and by in-app messaging when the message is made,
        and notices we provide through telephonic means will be effective when transmitted or dialed.
        You consent to receiving electronic communications from the African Proverbs App team and your use and access of the services provided through the African Proverbs App.
        It is your responsibility to keep your email address and any other contact information you provide to us current so that we may provide these communications to you.
      </p>

      <h2 className="text-2xl my-10 font-bold">Disclosure of Your Information.</h2>

      <p className="text-md mb-5 text-justify">
        We do not sell or share your personal data with any third-party advertisers or ad networks for their advertising purposes.
        We may disclose your personal information to third parties in order to process information as described above and otherwise enable our ability to provide the African Proverbs App services.
      </p>
      <h2 className="text-xl my-5 font-bold">Disclosure on your behalf.</h2>

      <p className="text-md mb-5 text-justify">
        We may disclose personal information that we collect or you provide as described in this Privacy Policy to fulfill our obligations,
        to accomplish the purpose for which you provide it, for any other purpose you request when you provide the information,
        or for any other purpose for which we have your consent.
      </p>

      <h2 className="text-xl my-5 font-bold">Disclosure by you.</h2>

      <p className="text-md mb-5 text-justify">
        When you share information through the African Proverbs App, that information is viewable by you and by anyone else you choose to share it with.
        If you give access to your African Proverbs App account to other applications and services, based on your approval,
        those services would then have access to your shared information. The use, collection,
        and protection of your data by such third-party services is subject to those third parties’ policies.
      </p>
      <h2 className="text-xl my-5 font-bold">Service providers and locations.</h2>

      <p className="text-md mb-5 text-justify">
        We may disclose personal information that we collect, or you provide as described in this Privacy Policy,
        to contractors, service providers, and other third parties we use to support African Proverbs App,
        as well as to support our operations. We may combine information we have with information of these service providers to facilitate their support. They will have access to your information only as reasonably necessary to perform these tasks on our behalf and are obligated not to disclose or use it for other purposes.
      </p>
      <h2 className="text-xl my-5 font-bold">African Proverbs content providers.</h2>

      <p className="text-md mb-5 text-justify">
        We utilize certain third parties to provide certain African Proverbs App content.
        We do not share personal information of African Proverbs App users with these third parties.
        We do, however, provide these third parties with aggregate analytics concerning the use of their content by country using de-identified and anonymized data.
        <br /> <br />
        Our ability to provide the services we provide on the African Proverbs App is through license agreements with various content providers.
        We do our best to only share your information with these content providers  <br />
        (i) on a confidential basis and only if the they agree to keep the information we share about you confidential; and
        <br />(ii) provide an additional prompt to you as a reminder of these terms,
        which you must agree to at that time in order to continue with your download.
        If you do not agree to this additional prompt, you may not be able to get all of the services available on the African Proverbs App platform.

      </p>
      <h2 className="text-xl my-5 font-bold">Legal process.</h2>

      <p className="text-md mb-5 text-justify">
        It is possible that we will need to disclose information about you when required by law,
        subpoena, or other legal process.
        We attempt to notify users about legal demands for their personal data when appropriate in our judgment,
        unless prohibited by law or court order or when the request is an emergency.
        We may dispute such demands when we believe, in our discretion, that the requests are overbroad,
        vague, or lack proper authority, but we do not promise to challenge every demand.
        We may also disclose your information if we have a good faith belief that disclosure is reasonably necessary to    <br />
        (i) investigate, prevent, or take action regarding suspected or actual illegal activities or to assist government enforcement agencies;   <br />
        (ii) enforce our agreements with you;   <br />
        (iii) investigate and defend ourselves against any third-party claims or allegations;   <br />
        (iv) protect the security or integrity of African Proverbs App; or   <br />
        (v) exercise or protect the rights and safety of African Proverbs App, users, our personnel, or others.
        We also reserve the right to confidentially disclose personal information we have about you in connection with a potential or actual merger or acquisition such as the sale of all or substantially all of our assets.
        if you do not agree to this additional prompt, you may not be able to get all of the services available on the African Proverbs App platform.

      </p>

      <h2 className="text-2xl my-10 font-bold">Deleting, Accessing, and Correcting Your Information.</h2>
      <h2 className="text-xl my-5 font-bold">How to make your requests.</h2>


      <p className="text-md mb-5 text-justify">
        For personal data that we have about you, you may request the following:
      </p>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>
          Deletion: You may ask us to erase or delete all or some of your personal data. Please note that doing so may limit your ability to use certain functionality of African Proverbs App.          </li>
        <li>
          Correction/Modification: You may edit some of your personal data through your account or ask us to change, update, or fix your data in certain cases, including if it is inaccurate.
        </li>
        <li>
          Object to, or limit or restrict, use of data: You can ask us to stop using all or some of your personal data or to limit our use of it.
        </li>
        <li>
          Right to access and/or take your data: You can ask us for a copy of or disclosure concerning your personal data you provided to us.
        </li>
      </ul>
      <p className="text-md mb-5 text-justify">
        Certain laws may provide the right to make these and additional requests concerning your personal information.
        If you have provided us with personal information and wish to make such a request under a specific region’s law,
        include the phrase “[Your State/Country] Privacy Request” in the subject line of your request and send your request via email to  <a href="mailto:contact@calmglobal.com" className="underline text-blue-500">
          contact@calmglobal.com
        </a> Attention: Head of Client Engagement.
      </p>
      <p className="text-md mb-5 text-justify">
        We ask that individuals making requests identify themselves with at least their name, address, and email address and identify the information requested to be accessed, corrected, or removed before we process the request. We may seek additional information to verify a requestor’s identity. We may also decline to process requests if we cannot verify the requestor's identity or if we believe the request will jeopardize the privacy of others, violate any law or legal requirement, would cause the information to be incorrect, or for a similar legitimate purpose.
      </p>
      <p className="text-md mb-5 text-justify">
        We will not discriminate against you for exercising any of your rights under applicable law. We do not charge a fee to process or respond to your verifiable request unless it is excessive, repetitive, or manifestly unfounded. If we determine that the request warrants a fee, we will tell you why we made that decision and provide you with a cost estimate before completing your request.
      </p>
      <p className="text-md mb-5 text-justify">
        Some information you have created, received, or used in the African Proverbs App may not be available in a usable form outside of African Proverbs App. As a result, when you request a copy of your personal information, we will be able to provide personal information you have provided to us, such as your name, address, phone number and the like; however, we may be unable to provide you with content that utilize African Proverbs App functionality.      </p>



      <h2 className="text-2xl my-10 font-bold">Deleting your account.</h2>

      <p className="text-md mb-5 text-justify">
        You can delete your African Proverbs App account at any time using the settings function in African Proverbs App.  If you do not want to delete your account, but want to temporarily stop using African Proverbs App, you may cease using the African Proverbs App and we will maintain your account and the information associated with your account until you resume use or delete your account, whichever comes first.
      </p>
      <p className="text-md mb-5 text-justify">
        If you choose to delete your account or ask that we modify or delete personal information, we will delete and purge personal information we have stored about you in a way that is electronically irreversible, however, we may retain your personal data if we have a legal right or obligation to maintain the information or to meet regulatory requirements, resolve disputes, maintain security, prevent fraud and abuse, enforce our rights, or fulfill any other requests from you.   Otherwise, if you request that we delete your account, we will delete your account and all the information we have that is associated with your account, except for aggregated statistics based on de-identified information and inferences we have made.      </p>

      <p className="text-md mb-5 text-justify">
        Our deletion of your information and account will generally take no more than 10 days from your request; however, cached information may take up to 30 days to delete. Please note that we have no control of information you have shared with others through African Proverbs App after you close your account or asked to delete information or attempted to delete your account yourself. Your information and content you have shared may continue to be displayed in the services of others.      </p>



      <h2 className="text-2xl my-5 font-bold">Security and Protection.</h2>

      <p className="text-md mb-5 text-justify">
        We implement security safeguards designed to protect your data. These include using encryption for your data while it is being transmitted between your device or browser and our servers and while it is at rest. Data provided to us through African Proverbs App is also stored in an ISO 27017-certified infrastructure management system, meaning it has been audited and found in compliance with the requirements of the management system standards ISO 27017, an internationally recognized code of practice for information security controls for cloud services.
      </p>
      <p className="text-md mb-5 text-justify">
        However, given the nature of communications and information technology, and that the use of the internet has inherent risks, although we regularly monitor for possible vulnerabilities and attacks, we cannot warrant or guarantee that information provided to us through African Proverbs App or stored in our systems or otherwise will be absolutely free from unauthorized intrusion by others, nor can we warrant or guarantee that such data may not be accessed, disclosed, altered, or destroyed by breach of any of our physical, technical, or managerial safeguards.      </p>



      <h2 className="text-xl my-5 font-bold">Children under the age of 16.</h2>

      <p className="text-md mb-5 text-justify">
        We do not collect personal information from any person we actually know is under the age of 16 without the consent of the parent or legal guardian of that minor.
      </p>
      <p className="text-md mb-5 text-justify">
        A parent or guardian may consent to the use of their African Proverbs App account by a minor on that parent or guardian’s primary profile. Should you allow your minor child to use your account, you shall be solely responsible for providing supervision of the minor’s use of African Proverbs App and assume full responsibility for the interpretation and use of any information or suggestions provided through African Proverbs App.
      </p>

      <h2 className="text-2xl my-5 font-bold">Third Party Information Collection</h2>

      <p className="text-md mb-5 text-justify">
        Please keep in mind that African Proverbs App may contain links to other websites or apps. You are responsible for reviewing the privacy statements and policies of those other websites you choose to link to or from the African Proverbs App, so that you can understand how those websites collect, use, and store your information. We are not responsible for the privacy statements, policies, or content of other websites or apps, including websites you link to or from the African Proverbs App. Websites containing co-branding (referencing our name and a third party’s name) contain content delivered by the third party and not us.
      </p>


      <h2 className="text-2xl my-5 font-bold">Users from Outside Nigeria</h2>

      <p className="text-md mb-5 text-justify">
        African Proverbs App is based out of Nigeria and your use of the African Proverbs App and this Privacy Policy is governed by the laws of Nigeria. If you are using the African Proverbs App from outside jurisdiction, please be aware that your information may be transferred to, stored, and processed in Germany, Canada, USA, and Nigeria where our servers are located, and our central database is operated. We process data both inside and outside of Germany, Canada, USA, and Nigeria and rely on contractual commitments between us and companies transferring personal data that require the protection and security of such data. The data protection and other laws of Germany, Canada, USA, and Nigeria might not be as comprehensive as those in your state or country. By using the African Proverbs App, you consent to your information being transferred to our facilities and to the facilities of those third parties with whom we share it with, as described in this Privacy Policy.
      </p>

      <h2 className="text-2xl my-5 font-bold">Changes to Our Privacy Policy</h2>

      <p className="text-md mb-5 text-justify">
        We may update our Privacy Policy from time to time to reflect changes in our practices. African Proverbs App is consistently seeking new and improved ways to offer African Proverbs App and increase engagement. As we improve African Proverbs App, this may mean the collection of new data or new ways to use data. African Proverbs App is dynamic, and we continuously seek to offer new features, therefore we may require changes in our collection or processing of information. If we collect materially different personal data or materially change how we use your data, we will update this Privacy Policy.
      </p>
      <p className="text-md mb-5 text-justify">
        We will post any changes to our Privacy Policy on this page. If we make material changes to how we process our users’ personal information, we will provide a notice that the Privacy Policy has been updated. The date the Privacy Policy was last modified is identified at the beginning of the Policy. You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically visiting this Privacy Policy to check for any changes.
      </p>
      <h2 className="text-2xl my-5 font-bold">Contact Information.</h2>
      <p className="text-md mb-5 text-justify">
        To ask questions or comment about this Privacy Policy and our privacy practices,
        you may contact us at to {""}
        <a
          href="mailto:contact@calmglobal.com"
          className="underline text-blue-500"
        >          contact@calmglobal.com
        </a> {""}
        Attention: Head of Client Engagement
      </p>


      {/* 
      <h2 className="text-2xl my-10 font-bold">Privacy Policy</h2>

      <p className="text-md mb-5 text-justify">
        African-Proverbs values and respects the privacy of the people we deal
        with. African-Proverbs is committed to protecting your privacy and
        complying with the Privacy Act 1988 (Cth) (
        <span className="font-bold">Privacy Act </span>) and other applicable
        privacy laws and regulations. 
      </p>
      */}






      {/* <p className="text-md mb-5 text-justify">
        This Privacy Policy ( <span className="font-bold">Policy</span>)
        describes how we collect, hold, use, and disclose your personal
        information, and how we maintain the quality and security of your
        personal information.
      </p>

      <h2 className="text-2xl my-10 font-bold">
        What is Personal Information?
      </h2>

      <p className="text-md mb-5 text-justify">
        “Personal information” means any information or opinion, whether true or
        not, and whether recorded in a material form or not, about an identified
        individual or an individual who is reasonably identifiable. In general
        terms, this includes information or an opinion that personally
        identifies you either directly (e.g. your name) or indirectly.
      </p> */}

      {/* <h2 className="text-2xl my-10 font-bold ">
        What Personal Information Do we Collect?
      </h2>

      <p className="text-md mb-5 text-justify">
        The personal information we collect about you depends on the nature of
        your dealings with us or what you choose to share with us. The personal
        information we collect about you may include your:
        <p className="my-5 font-bold">
         
          Name <br />
          Email address
          <br />
          Age <br />
          Phone number and any other information you may choose to share. <br />
        </p>
        Under certain circumstances, African-Proverbs may need to collect
        sensitive information about you. This might include any information or
        opinion about your racial or ethnic origin, political opinions,
        political association, religious or philosophical beliefs, membership of
        a trade union or other professional body, sexual preferences, criminal
        record, or health information. If we collect your sensitive information,
        we will do so only with your consent, if it is necessary to prevent a
        serious and imminent threat to life or health, or as otherwise required
        or authorized by law, and we take appropriate measures to protect the
        security of this information. You do not have to provide us with your
        personal information. Where possible, we will give you the option to
        interact with us anonymously or by using a pseudonym. However, if you
        choose to deal with us in this way or choose not to provide us with your
        personal information, we may not be able to provide you with our
        services or otherwise interact with you.
      </p>
      <h2 className="text-2xl my-10 font-bold">
        How do we collect your personal information?
      </h2>

      <p className="text-md mb-5 text-justify">
        We collect your personal information directly from you when you:
      </p>

      <ul>
        <li>
          <strong>●</strong> Interact with us over the phone.
        </li>
        <li>
          <strong>●</strong> Interact with us in person.
        </li>
        <li>
          <strong>●</strong> Download our App.
        </li>
        <li>
          <strong>●</strong> Interact with us online.
        </li>
        <li>
          <strong>●</strong> Participate in surveys or questionnaires.
        </li>
        <li>
          <strong>●</strong> Attend an African-Proverbs event.
        </li>
        <li>
          <strong>●</strong> Subscribe to our mailing list.
        </li>
        <li>
          <strong>●</strong> Apply for a position with us as an employee,
          contractor, or volunteer.
        </li>
      </ul> */}


      {/* 
      <h2 className="text-2xl my-10 font-bold">
        How do we Use Your Personal Information?
      </h2>

      <p className="text-md mb-5 text-justify">
        We use personal information for many purposes in connection with our
        functions and activities, including the following purposes:{" "}
      </p>

      <ul>
        <li>
          <strong>●</strong> Provide you with information or services that you
          request from us.
        </li>
        <li>
          <strong>●</strong> Deliver to you a more personalized experience and
          service offering.
        </li>
        <li>
          <strong>●</strong> Improve the quality of the services we offer.
        </li>
        <li>
          <strong>●</strong> Internal administrative purposes.
        </li>
        <li>
          <strong>●</strong> Marketing and research purposes.
        </li>
      </ul>

      <h2 className="text-2xl my-10 font-bold">
        Disclosure of personal information to third parties
      </h2>

      <p className="text-md mb-5 text-justify">
        We may disclose your personal information to third parties in accordance
        with this Policy in circumstances where you would reasonably expect us
        to disclose your information. For example, we may disclose your personal
        information to:
      </p>

      <ul>
        <li>
          • Our third-party service providers (for example, our IT providers).
        </li>
        <li>• Our marketing providers.</li>
        <li>• Our professional services advisors.</li>
      </ul> */}





      {/* <h2 className="text-2xl my-10 font-bold">
        How do we protect your personal information?{" "}
      </h2>

      <p className="text-md mb-5 text-justify">
        African-Proverbs will take reasonable steps to ensure that the personal
        information that we hold about you is kept confidential and secure,
        including by:
      </p>

      <ul className=" flex flex-col gap-3 my-3">
        <li>
          ● having a robust physical security of our premises and databases /
          records.
        </li>
        <li>
          ● taking measures to restrict access to only personnel who need that
          personal information to effectively provide services to you;
        </li>
        <li>
          ● having technological measures in place (for example, anti-virus
          software, fire walls);
        </li>
      </ul>

      <h2 className="text-2xl my-10 font-bold">Online activity </h2>

      <p>[Cookies]</p>
      <p className="text-md mb-5 text-justify mt-5">
        The African-Proverbs website uses cookies. A cookie is a small file of
        letters and numbers the website puts on your device if you allow it.
        These cookies recognize when your device has visited our website(s)
        before, so we can distinguish you from other users of the website. This
        improves your experience and the African-Proverbs website(s). <br />
        <br />
        We do not use cookies to identify you, just to improve your experience
        on our website(s). If you do not wish to use the cookies, you can amend
        the settings on your internet browser so it will not automatically
        download cookies. However, if you remove or block cookies on your
        computer, please be aware that your browsing experience and our
        website’s functionality may be affected.
      </p>
      <p>[Website analytics]</p>

      <p className="text-md mb-5 text-justify mt-5">
        Our website uses analytics service to help us better understand visitor
        traffic, so we can improve our services. Although this data is mostly
        anonymous, it is possible that under certain circumstances, we may
        connect it to you.
      </p>
      <p>[Direct marketing ]</p>
      <p className="text-md mb-5 text-justify mt-5">
        We may send you direct marketing communications and information about
        our services, opportunities, or events that we consider may be of
        interest to you if you have requested or consented to receive such
        communications. These communications may be sent in various forms,
        including mail, SMS, fax and email, in accordance with applicable
        marketing laws. You consent to us sending you those direct marketing
        communications by any of those methods. If you indicate a preference for
        a method of communication, we will endeavor to use that method whenever
        practical to do so. You may opt-out of receiving marketing
        communications from us at any time by [following the instructions to
        “unsubscribe’ set out in the relevant communication] / [contacting us
        using the details set out in the “How to contact us” section below]. In
        addition, we may also use your personal information or disclose your
        personal information to third parties for the purposes of advertising,
        including online behavioral advertising, website personalization, and to
        provide targeted or retargeted advertising content to you (including
        through third party websites).
      </p>

      <h2 className="text-2xl my-10 font-bold">
        Retention of personal information{" "}
      </h2>

      <p className="text-md mb-5 text-justify mt-5">
        We will not keep your personal information for longer than we need to.
        In most cases, this means that we will only retain your personal
        information for the duration of your relationship with us unless we are
        required to retain your personal information to comply with applicable
        laws, for example record-keeping obligations.
      </p>

      <h2 className="text-2xl my-10 font-bold">
        How to access and correct your personal information{" "}
      </h2>

      <p className="text-md mb-5 text-justify mt-5">
        African-Proverbs will endeavor to keep your personal information
        accurate, complete and up to date. If you wish to make a request to
        access and / or correct the personal information we hold about you, you
        should make a request by contacting us and we will usually respond
        within 3 - 7 days. We will deal with such a request by following the
        procedure outlined below:
      </p>

      <h2 className="text-2xl my-10 font-bold">Links to third party sites </h2>
      <p className="text-md mb-5 text-justify mt-5">
        African-Proverbs website(s) may contain links to websites operated by
        third parties. If you access a third-party website through our
        website(s), personal information may be collected by that third party
        website. We make no representations or warranties in relation to the
        privacy practices of any third-party provider or website and we are not
        responsible for the privacy policies or the content of any third party
        provider or website. Third party providers / websites are responsible
        for informing you about their own privacy practices and we encourage you
        to read their privacy policies.
      </p>

      <h2 className="text-2xl my-10 font-bold">Inquiries and complaints </h2> */}

      {/* <p className="text-md mb-5 text-justify mt-5">
        For complaints about how African-Proverbs handles, processes or manages
        your personal information, please contact{" "}
        <a href="mailto:contact@calmglobal.com" className="underline text-blue-500">
          contact@calmglobal.com
        </a>
        . Note we may require proof of your identity and full details of your
        request before we can process your complaint. Please allow up to 3
        working days for African-Proverbs to respond to your complaint. It will
        not always be possible to resolve a complaint to everyone’s
        satisfaction. If you are not satisfied with our response to a complaint,
        you have the right to contact via contact@calmglobal.com to lodge a
        complaint.
      </p>
      <h2 className="text-2xl my-10 font-bold">How to contact us</h2> */}

      {/* <p className="text-md mb-5 text-justify mt-5">
        If you have a question or concern in relation to our handling of your
        personal information or this Policy, you can contact us for assistance
        as follows:
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl my-5 font-bold">Email</h2>
          <a
            href="mailto:contact@calmglobal.com"
            className="underline text-blue-500"
          >
            contact@calmglobal.com
          </a>
          <a
            href="mailto:contact@calmglobal.com"
            className="underline text-blue-500"
          >
            support@calmglobal.com
          </a>
          <a
            href="mailto:contact@calmglobal.com"
            className="underline text-blue-500"
          >
            info@calmglobal.com
          </a>

          <h2 className="text-2xl my-5 font-bold">Contact number.</h2>
          <a href="tel:+2348107536218" className="underline text-green-500">
            Call Us: +234 810 753 6218
          </a>
          <h2 className="text-2xl my-5 font-bold">Post</h2>

          <a
            href="https://maps.app.goo.gl/mES5NtQ6LkVpq7iV9"
            target="_blank"
            className="underline text-red-500"
          >
            Address: Plot 118B Ilupeju Street, Dolphin Estate, Ikoyi Lagos
            Nigeria{" "}
          </a>
        </div>
      </p> */}
    </div>
  );
};

export default PrivacyPolicy;
