import { zodResolver } from '@hookform/resolvers/zod';
import { Egg } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';

const eggSizes = [
  { name: 'Peewee', minWeight: '35g' },
  { name: 'Small', minWeight: '42g' },
  { name: 'Medium', minWeight: '49g' },
  { name: 'Large', minWeight: '56g' },
  { name: 'Extra Large', minWeight: '63g' },
  { name: 'Jumbo', minWeight: '70g+' }
] as const;

const eggLoggingSchema = z.object({
  date: z.date(),
  chickenHouseId: z.string().optional(),
  notes: z.string().optional(),
  eggCounts: z.object({
    Peewee: z.number().min(0, "Count must be positive"),
    Small: z.number().min(0, "Count must be positive"),
    Medium: z.number().min(0, "Count must be positive"),
    Large: z.number().min(0, "Count must be positive"),
    'Extra Large': z.number().min(0, "Count must be positive"),
    Jumbo: z.number().min(0, "Count must be positive"),
  })
});

type EggLoggingFormData = z.infer<typeof eggLoggingSchema>;

const EggLogging: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EggLoggingFormData>({
    resolver: zodResolver(eggLoggingSchema),
    defaultValues: {
      eggCounts: {
        Peewee: 0,
        Small: 0,
        Medium: 0,
        Large: 0,
        'Extra Large': 0,
        Jumbo: 0,
      }
    }
  });

  const onSubmit = (data: EggLoggingFormData) => {
    console.log(data);
    reset();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="space-y-2 border-b pb-4">
          <div className="flex items-center gap-2">
            <Egg className="h-6 w-6 text-green-500" />
            <CardTitle className="text-2xl">Daily Egg Production Log</CardTitle>
          </div>
          <CardDescription>
            Record daily egg collection details including sizes and quantities
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Collection Date</label>
                <Input
                  type="date"
                  className="w-full"
                  {...register('date', {
                    setValueAs: (v) => v ? new Date(v) : undefined
                  })}
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Chicken House ID (Optional)</label>
                <Input {...register('chickenHouseId')} className="w-full" />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-4">Egg Size Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {eggSizes.map((size) => (
                  <div key={size.name} className="space-y-2">
                    <label className="text-sm font-medium flex justify-between">
                      <span>{size.name}</span>
                      <span className="text-gray-500 text-xs">Min: {size.minWeight}</span>
                    </label>
                    <Input
                      type="number"
                      min="0"
                      className="w-full"
                      {...register(`eggCounts.${size.name}` as `eggCounts.${EggSizeKey}`, {
                        setValueAs: (v) => v ? Number(v) : 0
                      })}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (Optional)</label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Add any additional observations or notes..."
                {...register('notes')}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
              >
                Clear Form
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
              >
                Log Production
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EggLogging;

// Add this type definition near the top of the file, after eggSizes
type EggSizeKey = typeof eggSizes[number]['name'];
