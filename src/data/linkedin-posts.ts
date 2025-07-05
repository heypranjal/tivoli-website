/**
 * LinkedIn Posts Data
 * Updated: 2025-07-05
 * 
 * Latest posts from The Tivoli Group LinkedIn company page
 * Update manually with latest 3 posts from: https://www.linkedin.com/company/the-tivoli-group
 */

export interface LinkedInPost {
  id: string;
  text: string;
  excerpt: string;
  image: string;
  date: string;
  linkedinUrl: string;
  type: 'image' | 'video' | 'text';
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export const linkedinPosts: LinkedInPost[] = [
  {
    id: 'post-1',
    text: 'Happy to announce a new signing under the brand Wedcation by Tivoli #tivolihospitalitygroup #wedcationbytivoli #Jimcorbetthotels #newhotelsigning',
    excerpt: 'Happy to announce a new signing under the brand Wedcation by Tivoli...',
    image: 'https://media.licdn.com/dms/image/v2/D5622AQHzKRJjKOe0mw/feedshare-shrink_1280/B56ZWLfSSVHsAo-/0/1741801991427?e=1754524800&v=beta&t=rUq4BY7-u9yeddvolnxTbcIsBTU0iySuErHyeSmhnc8',
    date: '2025-03-12',
    linkedinUrl: 'https://www.linkedin.com/posts/the-tivoli-group_tivolihospitalitygroup-wedcationbytivoli-activity-7305647078905454595-ghv8',
    type: 'image',
    engagement: {
      likes: 42,
      comments: 7,
      shares: 0
    }
  },
  {
    id: 'post-2',
    text: 'Tivoli Hospitality Group has announced the appointment of Amit Kumar Sood as the new Chief Executive Officer. With over 27 years of extensive leadership experience in the hospitality industry.',
    excerpt: 'Tivoli Hospitality Group announces the appointment of Amit Kumar Sood as the new CEO...',
    image: 'https://media.licdn.com/dms/image/v2/D5622AQGyZ_iyKRIV-A/feedshare-shrink_2048_1536/B56ZZ8gyWCHUAo-/0/1745845693918?e=1754524800&v=beta&t=-VSRRqfEqkac8rZDw2lsVHetB59FIcgKrE7QHcpmMog',
    date: '2025-05-05',
    linkedinUrl: 'https://www.linkedin.com/posts/todaystraveller_news-appointment-chiefexecutiveofficer-activity-7322607584467701760-f0Zl',
    type: 'image',
    engagement: {
      likes: 292,
      comments: 49,
      shares: 15
    }
  },
  {
    id: 'post-3',
    text: 'Happy to announce signing of another hotel at Maldevta, Dehradun under the brand - Wedcation by Tivoli',
    excerpt: 'Happy to announce signing of another hotel at Maldevta, Dehradun under the brand Wedcation by Tivoli...',
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQHcyZ_naCjwTQ/feedshare-shrink_800/B4EZWu2btSHMAk-/0/1742395261098?e=1754524800&v=beta&t=HX7_F4dwyRyrd2_MdhB5vrMkPsDMLUWg4A8crNQkYhA',
    date: '2025-03-19',
    linkedinUrl: 'https://www.linkedin.com/posts/the-tivoli-group_happy-to-announce-signing-of-another-hotel-activity-7308135417403310080-B8HR',
    type: 'image',
    engagement: {
      likes: 66,
      comments: 7,
      shares: 5
    }
  }
];