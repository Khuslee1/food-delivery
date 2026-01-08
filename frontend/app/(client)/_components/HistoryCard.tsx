import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryFood } from "./HistoryFood";

export const HistoryCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[20px]">Order history</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <HistoryFood hurgelt={false} />
        <HistoryFood hurgelt={true} />
      </CardContent>
    </Card>
  );
};
