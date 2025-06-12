"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Abant Yemek hangi bölgelere catering hizmeti veriyor?",
    answer:
      "Bolu merkez ve çevresindeki tüm ilçelere catering hizmeti veriyoruz. Düzce, Ankara, İstanbul gibi yakın illere de özel organizasyonlar için hizmet sunabiliyoruz.",
  },
  {
    question: "Düğün organizasyonu için kaç kişilik minimum sipariş alıyorsunuz?",
    answer:
      "Düğün organizasyonları için minimum 100 kişilik siparişler alıyoruz. Daha küçük etkinlikler için de özel fiyat teklifleri sunabiliyoruz.",
  },
  {
    question: "Menü önceden tadım yapabilir miyiz?",
    answer:
      "Evet, büyük organizasyonlar öncesinde ücretsiz tadım hizmeti sunuyoruz. Randevu alarak restoranımızda menü tadımı yapabilirsiniz.",
  },
  {
    question: "Vegan ve vejetaryen menü seçenekleriniz var mı?",
    answer:
      "Evet, vegan ve vejetaryen menü seçeneklerimiz bulunmaktadır. Özel diyet ihtiyaçları için de alternatif menüler hazırlayabiliyoruz.",
  },
  {
    question: "Rezervasyon iptali durumunda ücret alıyor musunuz?",
    answer:
      "Etkinlikten 48 saat öncesine kadar ücretsiz iptal hakkınız bulunmaktadır. Daha geç iptallerde kısmi ücret talep edilebilir.",
  },
  {
    question: "Kurumsal anlaşmalar yapıyor musunuz?",
    answer:
      "Evet, düzenli yemek servisi ihtiyacı olan kurumlarla özel anlaşmalar yapıyoruz. Fabrika, okul ve ofis yemek servisleri için uygun fiyatlar sunuyoruz.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-20 px-4 bg-gray-50" aria-labelledby="faq-heading">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="faq-heading" className="text-4xl font-bold text-gray-900 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Abant Yemek hizmetleri hakkında merak ettiğiniz soruların cevapları
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-[#a67b5b]">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                  role="button"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <CardTitle className="flex justify-between items-center text-[#8b4513]">
                    <span>{faq.question}</span>
                    {openIndex === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </CardTitle>
                </CardHeader>
                {openIndex === index && (
                  <CardContent id={`faq-answer-${index}`}>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
