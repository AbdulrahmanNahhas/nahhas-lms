import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formats";
import React from "react";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
  name?: string;
}

const DataCard = ({ value, label, shouldFormat, name }: DataCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center space-y-0 pb-0 justify-between">
        <CardTitle className="text-sm font-medium">

        {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {shouldFormat ? formatPrice(value) : value}
          {name ? (
            <p className="text-sm text-muted-foreground inline ml-1 font-medium">
              {name}
            </p>
          ): ""}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
