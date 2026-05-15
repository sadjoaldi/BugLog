/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bugReportsApi } from "../api/bugReports";
import BugReportForm from "../components/BugReportForm";
import { useToast } from "../context/ToastContext";
import type { BugReport, CreateBugReportInput } from "../types";

export default function EditBugReportPage() {
  const { id } = useParams<{ id: string }>();
  const [bugReport, setBugReport] = useState<BugReport | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (!id) return;

    const fetchBugReport = async () => {
      try {
        const data = await bugReportsApi.getById(id);
        setBugReport(data);
      } catch (_) {
        showToast("Rapport introuvable.", "error");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBugReport();
  }, [id, navigate]);

  const handleSubmit = async (input: CreateBugReportInput) => {
    setIsSubmitting(true);
    try {
      const isEditMode = !!id && !!bugReport;
      if (isEditMode) {
        await bugReportsApi.update(id, input);
        showToast("Rapport mis à jour.", "success");
        navigate(`/bug-reports/${id}`);
      } else {
        const created = await bugReportsApi.create(input);
        showToast("Rapport créé avec succès.", "success");
        navigate(`/bug-reports/${created.id}`);
      }
    } catch (_) {
      showToast("Une erreur est survenue.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-white/30 text-sm">Chargement...</p>
      </div>
    );
  }

  const isEditMode = !!id && !!bugReport;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate(isEditMode ? `/bug-reports/${id}` : "/")}
          className="text-white/40 hover:text-white gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
        <h1 className="text-base font-semibold text-white">
          {isEditMode ? "Modifier le rapport" : "Nouveau rapport"}
        </h1>
      </div>

      <BugReportForm
        initialValues={
          isEditMode
            ? {
                title: bugReport.title,
                description: bugReport.description,
                cause: bugReport.cause,
                solution: bugReport.solution,
                snippet: bugReport.snippet,
                category: bugReport.category,
                severity: bugReport.severity,
                status: bugReport.status,
                tags: bugReport.tags.map((t) => t.name),
                technologies: bugReport.technologies.map((t) => t.name),
                duration: bugReport.duration,
              }
            : undefined
        }
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </motion.div>
  );
}
