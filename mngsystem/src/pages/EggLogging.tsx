import { zodResolver } from '@hookform/resolvers/zod';
import { FileText } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import Header from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import styles from '../pages/styles/EggLogging.module.css';

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
  const navigate = useNavigate();
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
    <>
      <Header />
      <div className={styles.eggLoggingContainer}>
        <h1 className={styles.pageTitle}>Egg Logging</h1>
        <main className="flex-1 overflow-y-auto p-6">
          <div className={styles.dashboardContainer}>
            {/* Add this button before the Card component */}
            <Card className={styles.card}>
              <CardHeader className={styles.header}>
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
                      {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Chicken House ID (Optional)</label>
                      <Input {...register('chickenHouseId')} className="w-full" />
                    </div>
                  </div>

                  <div className={styles.eggSizeGrid}>
                    <h3 className={styles.label}>Egg Size Distribution</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {eggSizes.map((size) => (
                        <div key={size.name} className={styles.inputGroup}>
                          <label className="flex justify-between items-center">
                            <span className={styles.label}>{size.name}</span>
                            <span className={styles.minWeight}>Min: {size.minWeight}</span>
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

// Add this type definition near the top of the file, after eggSizes
type EggSizeKey = typeof eggSizes[number]['name'];
