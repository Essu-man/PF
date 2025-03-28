// src/pages/EggLogging.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

// Zod validation schema
const eggLoggingSchema = z.object({
  date: z.date(),
  totalEggs: z.number().min(0, "Eggs count must be positive"),
  chickenHouseId: z.string().optional(),
  notes: z.string().optional()
});

type EggLoggingFormData = z.infer<typeof eggLoggingSchema>;

const EggLogging: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EggLoggingFormData>({
    resolver: zodResolver(eggLoggingSchema)
  });

  const onSubmit = (data: EggLoggingFormData) => {
    // TODO: Implement submit logic to send data to backend
    console.log(data);
    reset();
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Log Egg Production</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Date</label>
              <Input
                type="date"
                {...register('date', {
                  setValueAs: (v) => v ? new Date(v) : undefined
                })}
              />
              {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>

            <div>
              <label>Total Eggs</label>
              <Input
                type="number"
                {...register('totalEggs', {
                  setValueAs: (v) => v ? Number(v) : undefined
                })}
              />
              {errors.totalEggs && <p className="text-red-500">{errors.totalEggs.message}</p>}
            </div>

            <div>
              <label>Chicken House ID (Optional)</label>
              <Input {...register('chickenHouseId')} />
            </div>

            <div>
              <label>Notes (Optional)</label>
              <textarea
                className="w-full border p-2"
                {...register('notes')}
              />
            </div>

            <Button type="submit">Log Egg Production</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EggLogging;
