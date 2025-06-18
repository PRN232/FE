import { mockBlogPosts } from "../data/mock-data";

export const getBlogPostById = (id: string) => {
    const basePost = mockBlogPosts.find((post) => post.id === id)
    if (!basePost) return null

    return {
        ...basePost,
        readTime: "8 min read",
        views: 1247,
        likes: 89,
        comments: 23,
        bookmarks: 45,
        tags: ["Health Screening", "Student Care", "Prevention", "Annual Checkup"],
        content: `
      <p>Annual health screenings are a cornerstone of preventive healthcare in schools, serving as an early detection system for potential health issues that could impact a student's academic performance and overall well-being. These comprehensive evaluations provide valuable insights into each child's physical development and health status.</p>

      <h2>Why Health Screenings Matter</h2>
      <p>Regular health screenings in schools serve multiple critical purposes. They help identify health conditions early when they're most treatable, ensure students are physically ready to learn, and provide parents with important information about their child's health and development.</p>

      <blockquote>
        <p>"Early detection through school health screenings has helped us identify and address health issues in over 200 students this year alone, significantly improving their quality of life and academic performance."</p>
        <cite>- Dr. Sarah Johnson, Chief Medical Officer</cite>
      </blockquote>

      <h2>What to Expect During a Screening</h2>
      <p>A typical school health screening includes several components designed to assess different aspects of your child's health:</p>

      <h3>Vision and Hearing Tests</h3>
      <p>These tests are crucial for identifying sensory impairments that could affect learning. Vision problems, in particular, are common among school-age children and can significantly impact academic performance if left unaddressed.</p>

      <h3>Physical Measurements</h3>
      <p>Height, weight, and BMI measurements help track your child's growth and development. These measurements are compared to standardized growth charts to ensure your child is developing normally.</p>

      <h3>Vital Signs Assessment</h3>
      <p>Blood pressure, heart rate, and temperature checks provide baseline health information and can help identify potential cardiovascular or other health concerns.</p>

      <h2>Preparing Your Child</h2>
      <p>Preparation is key to ensuring your child has a positive experience during their health screening. Here are some tips to help:</p>

      <ul>
        <li><strong>Explain the process:</strong> Talk to your child about what will happen during the screening in age-appropriate terms.</li>
        <li><strong>Address concerns:</strong> Listen to any worries your child might have and provide reassurance.</li>
        <li><strong>Ensure proper rest:</strong> Make sure your child gets adequate sleep the night before the screening.</li>
        <li><strong>Provide necessary information:</strong> Complete any required forms and provide relevant medical history.</li>
      </ul>

      <h2>Understanding the Results</h2>
      <p>After the screening, you'll receive a detailed report of your child's results. It's important to understand what these results mean and when follow-up care might be necessary.</p>

      <p>Most screening results will fall within normal ranges, but if any concerns are identified, our medical team will work with you to develop an appropriate follow-up plan. This might include referrals to specialists, additional testing, or simple lifestyle modifications.</p>

      <h2>The Role of Parents</h2>
      <p>Parents play a crucial role in the health screening process. Your involvement helps ensure that screenings are comprehensive and that any identified issues are properly addressed. We encourage parents to:</p>

      <ul>
        <li>Provide complete and accurate medical histories</li>
        <li>Ask questions about the screening process and results</li>
        <li>Follow through with recommended follow-up care</li>
        <li>Maintain open communication with school health staff</li>
      </ul>

      <h2>Looking Forward</h2>
      <p>Health screenings are just one component of our comprehensive school health program. By working together—students, parents, and healthcare providers—we can ensure that every child has the best possible foundation for academic success and lifelong health.</p>

      <p>If you have questions about your child's upcoming health screening or would like to discuss the results of a recent screening, please don't hesitate to contact our health center. We're here to support your child's health and well-being every step of the way.</p>
    `,
        relatedPosts: [
            {
                id: "2",
                title: "Managing Allergies in the School Environment",
                excerpt: "A comprehensive guide for parents on how to work with school staff to keep allergic children safe.",
                category: "Allergies",
                readTime: "6 min read",
                publishedAt: new Date("2023-09-10"),
            },
            {
                id: "3",
                title: "The Importance of Vaccination in Schools",
                excerpt: "Understanding why vaccines are crucial for maintaining a healthy school community.",
                category: "Vaccination",
                readTime: "5 min read",
                publishedAt: new Date("2023-09-05"),
            },
            {
                id: "4",
                title: "Mental Health Support for Students",
                excerpt: "Recognizing signs of mental health challenges and providing appropriate support.",
                category: "Mental Health",
                readTime: "7 min read",
                publishedAt: new Date("2023-08-28"),
            },
        ],
    }
}