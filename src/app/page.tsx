import { List } from "@/components/pages";
import DummyDataInitializer from "@/app/DummyDataInitializer";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <DummyDataInitializer /> 
      <div className="mx-auto w-full max-w-screen-sm px-4 py-6">
        <List />
      </div>
    </div>
  );
}
