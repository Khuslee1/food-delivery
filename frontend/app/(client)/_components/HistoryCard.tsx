import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryFood } from "./HistoryFood";

export const HistoryCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[20px]">Order history</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 max-h-100 overflow-scroll">
        <HistoryFood />
      </CardContent>
    </Card>
  );
};
