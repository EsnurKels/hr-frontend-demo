import React, { useEffect, useState } from "react";
import { getCandidates } from "../services/api";
import DataTable from "../components/DataTable";

interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCandidates().then((data) => {
      setCandidates(data);
      setLoading(false);
    });
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "Ad" },
    { key: "lastName", label: "Soyad" },
    { key: "phone", label: "Telefon" },
    { key: "email", label: "E-posta" },
    { key: "cvPath", label: "Cv" },
  ];

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Aday Listesi</h1>

        {loading ? (
          <p className="text-gray-500">Yükleniyor...</p>
        ) : (
          <DataTable data={candidates} columns={columns} />
        )}
      </div>
    </div>
  );
}
