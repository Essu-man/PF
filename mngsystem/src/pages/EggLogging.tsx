import { zodResolver } from '@hookform/resolvers/zod';
import { FileText } from 'lucide-react';
import React from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import Header from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';

import { toast } from 'react-hot-toast';
import styles from '../pages/styles/EggLogging.module.css';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

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
    PeeweePieces: z.number().min(0, "Count must be positive").max(30, "Pieces cannot exceed 30"),
    SmallPieces: z.number().min(0, "Count must be positive").max(30, "Pieces cannot exceed 30"),
    MediumPieces: z.number().min(0, "Count must be positive").max(30, "Pieces cannot exceed 30"),
    LargePieces: z.number().min(0, "Count must be positive").max(30, "Pieces cannot exceed 30"),
    'Extra LargePieces': z.number().min(0, "Count must be positive").max(30, "Pieces cannot exceed 30"),
    JumboPieces: z.number().min(0, "Count must be positive").max(30, "Pieces cannot exceed 30"),
  })
});

type EggLoggingFormData = z.infer<typeof eggLoggingSchema>;
type EggSizeKey = typeof eggSizes[number]['name'];

// Add this near the top of the component
const EggLogging: React.FC = () => {
  const navigate = useNavigate();

  // Replace the existing chickenHouses state with this
  const [chickenHouses] = React.useState([
    { id: 1, house_name: 'House A - Layer Section', capacity: 1000 },
    { id: 2, house_name: 'House B - Broiler Section', capacity: 800 }
  ]);



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
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
        PeeweePieces: 0,
        SmallPieces: 0,
        MediumPieces: 0,
        LargePieces: 0,
        'Extra LargePieces': 0,
        JumboPieces: 0,
      }
    }
  });

  // Add the totals calculation inside the component
  const eggCounts = watch('eggCounts');
  const totalCrates = Object.entries(eggCounts)
    .filter(([key]) => !key.includes('Pieces'))
    .reduce((sum, [, value]) => sum + Number(value || 0), 0);

  const totalPieces = Object.entries(eggCounts)
    .filter(([key]) => key.includes('Pieces'))
    .reduce((sum, [, value]) => sum + Number(value || 0), 0);

  const onSubmit = async (data: EggLoggingFormData) => {
    try {
      // Format the data properly
      const formattedData = {
        date: data.date.toISOString().split('T')[0],
        chickenHouseId: data.chickenHouseId ? parseInt(data.chickenHouseId) : null,
        eggCounts: {
          ...data.eggCounts,
          'Extra Large': data.eggCounts['Extra Large'],
          'Extra LargePieces': data.eggCounts['Extra LargePieces']
        },
        notes: data.notes || ''
      };

      console.log('Sending data:', formattedData); // Debug log

      const response = await fetch('http://localhost:5000/api/egg-production', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData); // Debug log
        throw new Error(errorData.details || 'Failed to save data');
      }

      toast.success('Production log saved successfully');
      reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save production log');
    }
  };

  return (
    <>
      <Header />
      <div className={styles.eggLoggingContainer}>
        <h1 className={styles.pageTitle}>Egg Logging</h1>
        <main className="flex-1 overflow-y-auto p-6">
          <div className={styles.dashboardContainer}>
            <Card className={styles.card}>
              <CardHeader>
                <div className={styles.titleSection}>
                  <div className="flex items-center gap-2">
                    {/* <Egg className="h-6 w-6 text-green-500" /> */}
                    <CardTitle className={styles.title}>Daily Egg Production Log</CardTitle>
                  </div>
                  <CardDescription>
                    Record daily egg collection details including sizes and quantities
                  </CardDescription>
                </div>
                <Button
                  className={styles.viewRecordsButton}
                  onClick={() => navigate('/egg-records')}
                >
                  <FileText className="w-5 h-5" />
                  View Records
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Collection Date</label>
                      <Input
                        type="date"
                        className="w-full"
                        {...register('date', {
                          setValueAs: (v) => v ? new Date(v) : undefined
                        })}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm">
                          {(errors.date as FieldError)?.message || 'Invalid date'}
                        </p>
                      )}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Chicken House</label>
                      <Select
                        defaultValue=""
                        onValueChange={(value) => {
                          const event = {
                            target: { name: 'chickenHouseId', value: value }
                          };
                          register('chickenHouseId').onChange(event);
                        }}
                      >
                        <SelectTrigger className={styles.selectTrigger}>
                          <SelectValue placeholder="Select a chicken house" />
                        </SelectTrigger>
                        <SelectContent className={styles.selectContent}>
                          {chickenHouses.map(house => (
                            <SelectItem
                              key={house.id}
                              value={String(house.id)}
                            >
                              {house.house_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.chickenHouseId && (
                        <p className="text-red-500 text-sm">
                          {(errors.chickenHouseId as FieldError)?.message || 'Please select a chicken house'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={styles.eggSizeGrid}>
                    <h3 className={styles.label}>Egg Size Distribution</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {eggSizes.map((size) => (
                        <div key={size.name} className={styles.sizeRow}>
                          <div className={styles.sizeInfo}>
                            <span className={styles.label}>{size.name}</span>
                            <span className={styles.minWeight}>Min: {size.minWeight}</span>
                          </div>
                          <div className={styles.countInputs}>
                            <div className={styles.inputWrapper}>
                              <label className={styles.smallLabel}>Crates</label>
                              <Input
                                type="number"
                                min="0"
                                className="w-full"
                                {...register(`eggCounts.${size.name}` as `eggCounts.${EggSizeKey}`, {
                                  setValueAs: (v) => v ? Number(v) : 0
                                })}
                              />
                            </div>
                            <div className={styles.inputWrapper}>
                              <label className={styles.smallLabel}>Pieces</label>
                              <Input
                                type="number"
                                min="0"
                                max="30"
                                className="w-full"
                                {...register(`eggCounts.${size.name}Pieces` as `eggCounts.${EggSizeKey}Pieces`, {
                                  setValueAs: (v) => v ? Number(v) : 0
                                })}
                              />
                              {errors.eggCounts?.[`${size.name}Pieces` as keyof typeof errors.eggCounts] && (
                                <p className="text-red-500 text-sm">
                                  {(errors.eggCounts[`${size.name}Pieces` as keyof typeof errors.eggCounts] as FieldError)?.message || 'Invalid input'}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add the totals section here */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className={styles.label}>Totals</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p>Total Crates: {totalCrates}</p>
                      </div>
                      <div>
                        <p>Total Pieces: {totalPieces}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Notes (Optional)</label>
                    <textarea
                      className={styles.notes}
                      placeholder="Add any additional observations or notes..."
                      {...register('notes')}
                    />
                  </div>

                  <div className={styles.buttonContainer}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => reset()}
                    >
                      Clear Form
                    </Button>
                    <Button
                      type="submit"
                      className={styles.submitButton}
                    >
                      Log Production
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default EggLogging;
