import React, { useState } from 'react';
import {
  Globe,
  Palette,
  Code,
  Languages,
  Video,
  PenTool,
  TrendingUp,
  Film,
} from 'lucide-react';
import ServiceModal from './ServiceModal';

const servicesData = [
  {
    icon: Globe,
    title: 'DTP Localization',
    description: 'Tailoring desktop publishing content to suit different languages and cultures, ensuring accuracy and cultural relevance.',
    color: 'from-blue-500 to-blue-600',
    details: {
      overview: 'Our DTP Localization service ensures your content resonates with global audiences by adapting desktop publishing materials to different languages and cultural contexts. We maintain design integrity while ensuring linguistic accuracy and cultural appropriateness.',
      features: [
        'Multi-language layout adaptation',
        'Cultural sensitivity review',
        'Font and typography optimization',
        'Image and graphic localization',
        'Quality assurance testing',
        'Format compatibility checks'
      ],
      benefits: [
        'Reach global markets effectively',
        'Maintain brand consistency',
        'Reduce time-to-market',
        'Ensure cultural compliance',
        'Professional presentation'
      ],
      process: [
        'Content analysis and scope definition',
        'Language and cultural research',
        'Layout adaptation and design',
        'Translation integration and review',
        'Quality testing and final delivery'
      ],
      deliverables: [
        'Localized design files',
        'Print-ready formats',
        'Digital publishing files',
        'Style guide documentation',
        'Quality assurance report'
      ],
      timeline: '5-15 business days depending on complexity and language pairs'
    }
  },
  {
    icon: Palette,
    title: 'Graphic Designing',
    description: 'Creating visually compelling designs that align with brand identities and marketing goals.',
    color: 'from-purple-500 to-purple-600',
    details: {
      overview: 'Transform your brand vision into stunning visual communications. Our graphic design services combine creativity with strategic thinking to deliver designs that not only look amazing but also drive business results.',
      features: [
        'Brand identity development',
        'Marketing collateral design',
        'Digital and print media',
        'Logo and icon creation',
        'Packaging design',
        'Social media graphics'
      ],
      benefits: [
        'Enhanced brand recognition',
        'Professional market presence',
        'Increased customer engagement',
        'Consistent visual identity',
        'Competitive advantage'
      ],
      process: [
        'Brand discovery and research',
        'Concept development and sketching',
        'Design creation and refinement',
        'Client feedback and revisions',
        'Final delivery and brand guidelines'
      ],
      deliverables: [
        'High-resolution design files',
        'Vector and raster formats',
        'Brand style guide',
        'Print-ready artwork',
        'Digital asset library'
      ],
      timeline: '7-21 business days based on project scope'
    }
  },
  {
    icon: Code,
    title: 'Website Development',
    description: 'Building responsive and user-friendly websites to establish a strong online presence.',
    color: 'from-teal-500 to-teal-600',
    details: {
      overview: 'Create powerful, responsive websites that drive business growth. Our development team builds modern, fast, and SEO-optimized websites using the latest technologies and best practices.',
      features: [
        'Responsive web design',
        'Custom CMS development',
        'E-commerce solutions',
        'SEO optimization',
        'Performance optimization',
        'Security implementation'
      ],
      benefits: [
        'Professional online presence',
        'Mobile-friendly experience',
        'Search engine visibility',
        'Lead generation capability',
        'Scalable architecture'
      ],
      process: [
        'Requirements gathering and planning',
        'UI/UX design and prototyping',
        'Development and coding',
        'Testing and quality assurance',
        'Launch and ongoing support'
      ],
      deliverables: [
        'Fully functional website',
        'Admin panel access',
        'Source code files',
        'Documentation and training',
        'Hosting setup assistance'
      ],
      timeline: '15-45 business days depending on complexity'
    }
  },
  {
    icon: Languages,
    title: 'Translations & Transcription',
    description: 'Providing accurate language translation and transcription services to bridge communication gaps.',
    color: 'from-green-500 to-green-600',
    details: {
      overview: 'Break down language barriers with our professional translation and transcription services. We ensure accurate, culturally appropriate translations that maintain the original meaning and context.',
      features: [
        'Document translation',
        'Audio/video transcription',
        'Website localization',
        'Technical translation',
        'Certified translations',
        'Proofreading services'
      ],
      benefits: [
        'Global market access',
        'Clear communication',
        'Cultural accuracy',
        'Professional quality',
        'Fast turnaround'
      ],
      process: [
        'Content assessment and quote',
        'Native translator assignment',
        'Translation and review process',
        'Quality control and editing',
        'Final delivery and support'
      ],
      deliverables: [
        'Translated documents',
        'Transcription files',
        'Quality assurance report',
        'Certification (if required)',
        'Revision support'
      ],
      timeline: '3-10 business days based on word count'
    }
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Enhancing video content to effectively convey messages and engage audiences.',
    color: 'from-red-500 to-red-600',
    details: {
      overview: 'Transform raw footage into compelling video content that captivates your audience. Our video editing services combine technical expertise with creative storytelling to deliver professional results.',
      features: [
        'Professional video editing',
        'Motion graphics and animation',
        'Color correction and grading',
        'Audio enhancement',
        'Subtitle and caption creation',
        'Multi-format delivery'
      ],
      benefits: [
        'Engaging visual content',
        'Professional presentation',
        'Increased viewer retention',
        'Brand storytelling',
        'Social media optimization'
      ],
      process: [
        'Footage review and planning',
        'Rough cut and structure',
        'Detailed editing and effects',
        'Audio mixing and enhancement',
        'Final review and delivery'
      ],
      deliverables: [
        'Edited video files',
        'Multiple format versions',
        'Project source files',
        'Thumbnail images',
        'Delivery specifications'
      ],
      timeline: '5-20 business days depending on length'
    }
  },
  {
    icon: Film,
    title: 'Reels Editing',
    description: 'Creating engaging short-form video content optimized for social media platforms and maximum reach.',
    color: 'from-pink-500 to-rose-600',
    details: {
      overview: 'Capture attention and drive engagement with professionally edited reels. Our reel editing service specializes in creating viral-worthy content that resonates with your target audience across all social media platforms.',
      features: [
        'Trending format adaptation',
        'Music and sound synchronization',
        'Dynamic transitions and effects',
        'Text overlay and captions',
        'Platform-specific optimization',
        'Hashtag and trend research'
      ],
      benefits: [
        'Increased social media reach',
        'Higher engagement rates',
        'Viral content potential',
        'Brand awareness boost',
        'Cost-effective marketing'
      ],
      process: [
        'Content strategy and planning',
        'Raw footage review and selection',
        'Creative editing and effects',
        'Music and audio integration',
        'Platform optimization and delivery'
      ],
      deliverables: [
        'Edited reel videos',
        'Multiple aspect ratios',
        'Thumbnail options',
        'Caption suggestions',
        'Posting schedule recommendations'
      ],
      timeline: '2-5 business days per reel'
    }
  },
  {
    icon: PenTool,
    title: 'Content Writing',
    description: 'Crafting compelling written content tailored to various platforms and audiences.',
    color: 'from-indigo-500 to-indigo-600',
    details: {
      overview: 'Engage your audience with high-quality, SEO-optimized content that drives action. Our content writing services help establish thought leadership and improve search engine rankings.',
      features: [
        'SEO-optimized articles',
        'Website copy and pages',
        'Blog post creation',
        'Social media content',
        'Email marketing copy',
        'Technical documentation'
      ],
      benefits: [
        'Improved search rankings',
        'Increased website traffic',
        'Better user engagement',
        'Thought leadership',
        'Lead generation'
      ],
      process: [
        'Content strategy development',
        'Research and keyword analysis',
        'Writing and optimization',
        'Review and editing',
        'Final delivery and revisions'
      ],
      deliverables: [
        'Written content pieces',
        'SEO optimization report',
        'Keyword research data',
        'Content calendar',
        'Performance guidelines'
      ],
      timeline: '3-7 business days per piece'
    }
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Implementing strategies to increase online visibility and drive business growth.',
    color: 'from-orange-500 to-orange-600',
    details: {
      overview: 'Accelerate your business growth with data-driven digital marketing strategies. We help you reach the right audience, at the right time, with the right message across all digital channels.',
      features: [
        'Social media marketing',
        'Search engine optimization',
        'Pay-per-click advertising',
        'Email marketing campaigns',
        'Analytics and reporting',
        'Conversion optimization'
      ],
      benefits: [
        'Increased online visibility',
        'Higher conversion rates',
        'Better ROI tracking',
        'Targeted audience reach',
        'Sustainable growth'
      ],
      process: [
        'Market research and analysis',
        'Strategy development and planning',
        'Campaign implementation',
        'Performance monitoring',
        'Optimization and reporting'
      ],
      deliverables: [
        'Marketing strategy document',
        'Campaign setup and management',
        'Monthly performance reports',
        'Analytics dashboard access',
        'Optimization recommendations'
      ],
      timeline: 'Ongoing monthly campaigns'
    }
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service: typeof servicesData[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Digital Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive services designed to enhance your business's digital presence 
              and drive meaningful growth across all platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  onClick={() => handleServiceClick(service)}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
                    Learn more →
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Services;