// src/pages/MedicationTracking.tsx
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
interface Medication {
  id: string;
  name: string;
  lastAdministered: Date;
  nextDue: Date;
  dosage: string;
}

const MedicationTracking: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Newcastle Vaccine',
      lastAdministered: new Date('2024-02-15'),
      nextDue: new Date('2024-04-15'),
      dosage: '1ml per 1000 birds'
    }
  ]);

  const [newMedication, setNewMedication] = useState({
    name: '',
    lastAdministered: '',
    nextDue: '',
    dosage: ''
  });

  const addMedication = () => {
    if (newMedication.name && newMedication.lastAdministered && newMedication.nextDue) {
      const medication: Medication = {
        id: String(medications.length + 1),
        name: newMedication.name,
        lastAdministered: new Date(newMedication.lastAdministered),
        nextDue: new Date(newMedication.nextDue),
        dosage: newMedication.dosage
      };
      setMedications([...medications, medication]);
      // Reset form
      setNewMedication({
        name: '',
        lastAdministered: '',
        nextDue: '',
        dosage: ''
      });
    }
  };

  const updateMedicationAdministration = (id: string) => {
    setMedications(medications.map(med =>
      med.id === id
        ? {
            ...med,
            lastAdministered: new Date(),
            nextDue: new Date(new Date().setMonth(new Date().getMonth() + 2))
          }
        : med
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <Header/>
      <Card>
        <CardHeader>
          <CardTitle>Medication Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {medications.map((med) => (
            <div
              key={med.id}
              className={`p-4 mb-2 rounded ${med.nextDue < new Date() ? 'bg-red-100' : 'bg-green-100'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{med.name}</h3>
                  <p>Dosage: {med.dosage}</p>
                  <p>Last Administered: {med.lastAdministered.toLocaleDateString()}</p>
                  <p>Next Due: {med.nextDue.toLocaleDateString()}</p>
                </div>
                <Button
                  onClick={() => updateMedicationAdministration(med.id)}
                >
                  Administer
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Medication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Medication Name"
              value={newMedication.name}
              onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
            />
            <div className="flex space-x-4">
              <div className="w-full">
                <label>Last Administered</label>
                <Input
                  type="date"
                  value={newMedication.lastAdministered}
                  onChange={(e) => setNewMedication({...newMedication, lastAdministered: e.target.value})}
                />
              </div>
              <div className="w-full">
                <label>Next Due</label>
                <Input
                  type="date"
                  value={newMedication.nextDue}
                  onChange={(e) => setNewMedication({...newMedication, nextDue: e.target.value})}
                />
              </div>
            </div>
            <Input
              placeholder="Dosage (e.g., 1ml per 1000 birds)"
              value={newMedication.dosage}
              onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
            />
            <Button onClick={addMedication}>Add Medication</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationTracking;