import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";

export default function Testing() {
  return (
    <div className="min-h-screen pt-40">
      <Container>
        <Heading as="h1" size="2xl" className="text-center">
          Stránka pro testování komponent
        </Heading>
      </Container>
    </div>
  );
}
