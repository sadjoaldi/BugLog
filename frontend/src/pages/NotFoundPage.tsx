import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Bug } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/20">
          <Bug className="w-8 h-8 text-indigo-400" />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl font-bold text-white/10"
        >
          404
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-xl font-semibold text-white mb-2">Page introuvable</h1>
          <p className="text-sm text-white/40">Cette page n'existe pas ou a été déplacée.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => navigate("/bug-reports")}
            className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux rapports
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
