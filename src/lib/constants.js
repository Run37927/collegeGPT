export const bcitData = `
- <loc>https://www.bcit.edu/admissions</loc>
  <content>Information about admission requirements, deadlines, and how to apply.</content>

- <loc>https://www.bcit.edu/programs</loc>
  <content>List of academic programs offered, including diplomas, degrees, and certificates.</content>

- <loc>https://www.bcit.edu/tuition-fees</loc>
  <content>Detailed breakdown of tuition fees, payment methods, and financial aid options.</content>

- <loc>https://www.bcit.edu/campus-life</loc>
  <content>Overview of student life, clubs, organizations, and campus facilities.</content>

- <loc>https://www.bcit.edu/contact-us</loc>
  <content>Contact information for various departments, including admissions, financial aid, and student services.</content>

- <loc>https://www.bcit.edu/about</loc>
  <content>History of the college, mission statement, and information about the faculty and staff.</content>

- <loc>https://www.bcit.edu/news-events</loc>
  <content>Latest news updates, upcoming events, and announcements relevant to students and faculty.</content>

- <loc>https://www.bcit.edu/library-services</loc>
  <content>Information about library services, including online resources, study spaces, and borrowing policies.</content>

- <loc>https://www.bcit.edu/career-services</loc>
  <content>Career counseling, job placement services, and resources for alumni and current students seeking employment.</content>
`;

export const chatbotPrompt = `You are a helpful customer support chatbot embedded on a private college's website. You are able to answer questions about the website and its content.
Use this college website metadata to answer the customer's questions:
${bcitData}
Only include links in markdown format. Example: 'You can browse our programs [here](https://www.bcit.edu/programs)'. Other than links, use regular text.
Refuse any answer that does not have to do with the school or its content, provide short, concise answers.`