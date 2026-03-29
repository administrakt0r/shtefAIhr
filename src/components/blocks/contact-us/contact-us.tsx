import Image from "next/image";

import ContactForm from "@/components/blocks/contact-us/contact-form";
import { Card, CardContent } from "@/components/ui/card";

const ContactUs = () => {
  return (
    <section className="bg-muted py-8 sm:py-16 lg:h-dvh lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center sm:mb-16">
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Javite nam se za informacije, ispravke ili suradnju
          </h2>
          <p className="text-muted-foreground text-xl">
            Pošaljite poruku za prijavu netočnih informacija, uredničke upite
            ili razgovor o AI temama koje vrijedi pokriti.
          </p>
        </div>

        <Card className="border-none shadow-none">
          <CardContent className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <ContactForm />
            </div>

            <div className="shadow-none md:col-span-2">
              <Image
                src="/images/contact-us.webp"
                alt="Kontakt ilustracija"
                width={1120}
                height={880}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="size-full rounded-xl border object-cover max-md:max-h-70"
                priority
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactUs;
