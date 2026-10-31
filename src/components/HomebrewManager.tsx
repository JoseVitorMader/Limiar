import React, { useState } from 'react';
import { useLimiar } from '../context/LimiarContext';
import {
  Sliders,
  Download,
  Upload,
  RotateCcw,
  BookOpen,
  Sparkles,
  Shield,
  Layers,
  Check,
  AlertTriangle,
  Info,
} from 'lucide-react';

export const HomebrewManager: React.FC = () => {
  const { exportDataJSON, importDataJSON, resetToDefaults } = useLimiar();
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleDownloadBackup = () => {
    const json = exportDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `limiar_mesa_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyImport = () => {
    if (!importText.trim()) return;
    const ok = importDataJSON(importText);
    if (ok) {
      setImportStatus('Dados importados e sincronizados com sucesso!');
      setImportText('');
    } else {
      setImportStatus('Erro ao importar JSON. Verifique a formatação do arquivo.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-slate-100">
              SISTEMA ABERTO · HOMEBREW & MODULARIDADE
            </h2>
            <p className="text-xs text-slate-400">
              Gerencie conteúdos customizados, backup de mesas e expansões conforme novas partes de LIMIAR forem lançadas.
            </p>
          </div>
        </div>

        <div className="bg-limiar-850 p-3 rounded-lg border border-limiar-700/60 text-xs text-slate-300 mt-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            <strong>Arquitetura Modular:</strong> Este sistema foi projetado levando em consideração que LIMIAR se encontra na <em>Versão 0.1 (Edição de Trabalho)</em>. O motor já suporta a criação e persistência de novas origens, classes, trilhas, dons do Cap. 32 e armamento fendido de volumes futuros.
          </p>
        </div>
      </div>

      {/* Grid de Ferramentas de Dados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BACKUP & SINCRONIZAÇÃO */}
        <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-5 space-y-4">
          <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2 border-b border-limiar-800 pb-2">
            <Download className="w-4 h-4 text-cyan-400" /> EXPORTAR & IMPORTAR BACKUP (JSON)
          </h3>

          <p className="text-xs text-slate-400">
            Exporte todo o estado atual de suas mesas, fichas de personagens, compêndio de armas e dons para carregar em outro navegador ou computador.
          </p>

          <button
            onClick={handleDownloadBackup}
            className="w-full py-2.5 bg-limiar-800 hover:bg-limiar-700 text-slate-200 rounded-lg text-xs font-display font-bold tracking-wide flex items-center justify-center gap-2 transition border border-limiar-700"
          >
            <Download className="w-4 h-4 text-emerald-400" /> BAIXAR ARQUIVO DE BACKUP (.JSON)
          </button>

          <div className="pt-2 border-t border-limiar-800 space-y-2">
            <label className="block text-xs font-mono text-slate-400">Restaurar / Colar Backup JSON:</label>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={3}
              placeholder="Cole o código JSON do seu backup aqui..."
              className="w-full bg-limiar-850 border border-limiar-700 rounded-lg p-2.5 text-xs font-mono text-slate-100"
            />
            <button
              onClick={handleApplyImport}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-display font-bold transition flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4" /> Restaurar Dados
            </button>
            {importStatus && (
              <p className="text-xs font-mono text-amber-400 pt-1">{importStatus}</p>
            )}
          </div>
        </div>

        {/* RESTAURAÇÃO DE PADRÕES */}
        <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-5 space-y-4">
          <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2 border-b border-limiar-800 pb-2">
            <RotateCcw className="w-4 h-4 text-rose-400" /> RESTAURAR OFICIAIS DO LIVRO
          </h3>

          <p className="text-xs text-slate-400">
            Restaure os 6 Agentes Prontos do Capítulo 23 (Rafa, Nina, Davi, Helena, Léo, Bia), a armaria oficial e o bestiário original se desejar reiniciar os conteúdos padrão.
          </p>

          <button
            onClick={() => {
              if (confirm('Tem certeza de que deseja restaurar as fichas, armas e dons oficiais padrão?')) {
                resetToDefaults();
                alert('Conteúdos oficiais restaurados com sucesso.');
              }
            }}
            className="w-full py-2.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-600/60 text-rose-200 rounded-lg text-xs font-display font-bold tracking-wide flex items-center justify-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" /> RESTAURAR DADOS OFICIAIS DE LIMIAR
          </button>

          {/* Dicas de Mesa */}
          <div className="bg-limiar-850 p-3.5 rounded-lg border border-limiar-800 space-y-2 text-xs">
            <h4 className="font-display font-bold text-amber-400">GUIA RÁPIDO DO MESTRE (CAP. 8 A 14):</h4>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              <li><strong>Teste básico:</strong> Rola d20 = Atributo. Pega o maior + Bônus.</li>
              <li><strong>Atributo 0:</strong> Rola 2d20 e pega o menor!</li>
              <li><strong>Destaque (20 mantido):</strong> Acerto automático e dobra dados de dano.</li>
              <li><strong>Desastre (todos 1):</strong> Falha dramática com complicação.</li>
              <li><strong>Sucesso Pleno:</strong> Supera DT por 10 ou mais (+1 dado de dano).</li>
              <li><strong>Relógio da Fenda:</strong> 48h para selar antes da Ruptura permanente.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
