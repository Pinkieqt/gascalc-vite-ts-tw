import { Text } from "@nextui-org/react";
import React from "react";

function Home() {
  return (
    <>
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $green300 20%, $yellow200 70%",
        }}
        weight="bold"
      >
        Hello,
      </Text>
    </>
  );
}

export default Home;
