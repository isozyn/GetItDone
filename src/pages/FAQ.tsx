import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is EmpowerSA?",
          answer: "EmpowerSA is an educational NGO based in South Africa dedicated to reducing unemployment through practical skills training. We offer free workshops in sewing, gardening, and domestic services to help individuals build sustainable livelihoods.",
        },
        {
          question: "Are the workshops really free?",
          answer: "Yes! All our workshops are completely free of charge. This includes training materials, refreshments during sessions, and job placement assistance upon completion. We believe financial barriers should never prevent someone from accessing education.",
        },
        {
          question: "Who can participate in the workshops?",
          answer: "Our programs are open to all South African residents aged 18 and above who are committed to learning new skills and improving their employment prospects. No previous experience is required.",
        },
      ],
    },
    {
      category: "Enrollment",
      questions: [
        {
          question: "How do I enroll in a workshop?",
          answer: "You can enroll by filling out our contact form or visiting our office in person. We'll schedule an initial consultation to understand your goals and match you with the most suitable program. Classes start monthly, so there's always an opportunity to join.",
        },
        {
          question: "What documents do I need to register?",
          answer: "You'll need a valid South African ID, proof of residence, and a contact phone number. If you're unemployed, bring any documentation that confirms your status, though this is not mandatory for enrollment.",
        },
        {
          question: "How long is the waiting period?",
          answer: "Waiting times vary by program and location. Typically, you can start within 2-4 weeks of your initial consultation. We maintain multiple class schedules to accommodate as many participants as possible.",
        },
      ],
    },
    {
      category: "Workshop Details",
      questions: [
        {
          question: "How long do the workshops last?",
          answer: "Workshop duration varies by program: Sewing & Tailoring (8 weeks), Gardening & Agriculture (10 weeks), and Domestic Services (6 weeks). All programs include practical hands-on training and theoretical knowledge.",
        },
        {
          question: "What is the class schedule?",
          answer: "Most workshops run three times per week, with morning and afternoon sessions available. Each session is 3 hours long. We work with you to find a schedule that fits your circumstances.",
        },
        {
          question: "Do I receive a certificate?",
          answer: "Yes! Upon successful completion, you'll receive a certified credential recognized by employers in your field. This certificate validates your skills and improves your employment prospects.",
        },
        {
          question: "What materials are provided?",
          answer: "We provide all necessary materials and equipment during the workshop. For sewing, this includes fabric, threads, and machine access. For gardening, we provide seeds, tools, and supplies. You'll also receive a starter kit to use after graduation.",
        },
      ],
    },
    {
      category: "After Graduation",
      questions: [
        {
          question: "Will you help me find a job?",
          answer: "Absolutely! We offer comprehensive job placement assistance, including CV writing support, interview preparation, and connections to our network of partner employers. Our career counselors work with you until you're successfully employed.",
        },
        {
          question: "What is the employment success rate?",
          answer: "Approximately 85% of our graduates find employment or start their own businesses within 6 months of completing their workshop. We maintain relationships with local businesses actively seeking skilled workers.",
        },
        {
          question: "Can I start my own business with these skills?",
          answer: "Many of our graduates become successful entrepreneurs! We provide basic business skills training as part of each workshop, covering pricing, marketing, and customer service. We also connect you with resources for business registration and microfinance.",
        },
      ],
    },
    {
      category: "Getting Involved",
      questions: [
        {
          question: "How can I volunteer?",
          answer: "We welcome volunteers! Fill out our volunteer application form on the Get Involved page. We have opportunities for instructors, mentors, administrative support, and more. We'll match your skills and availability with our current needs.",
        },
        {
          question: "Can my company partner with you?",
          answer: "We'd love to explore corporate partnerships! Companies can support us through job opportunities for graduates, workshop sponsorships, in-kind donations, or employee volunteer programs. Contact us to discuss partnership opportunities.",
        },
        {
          question: "How are donations used?",
          answer: "Every donation directly supports our programs. Funds go toward workshop materials, instructor salaries, facility costs, and expanding to new locations. We maintain full transparency and provide regular updates to donors about the impact of their contributions.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-warm mb-4">
            <HelpCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our programs, enrollment, and how to get involved
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-3xl mx-auto space-y-8 mb-12">
          {faqs.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="animate-fade-in"
              style={{ animationDelay: `${sectionIndex * 100}ms` }}
            >
              <h2 className="text-2xl font-bold mb-4">{section.category}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {section.questions.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${sectionIndex}-${faqIndex}`}
                    className="border rounded-lg px-6 shadow-card hover:shadow-hover transition-smooth"
                  >
                    <AccordionTrigger className="text-left font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <Card className="max-w-2xl mx-auto shadow-hover">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Still Have Questions?</CardTitle>
            <CardDescription>
              Can't find what you're looking for? We're here to help!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Contact Us
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" size="lg">
                View Our Workshops
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
