export default function ScoreCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 text-xl font-semibold">
        Mission Score
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-3">
          <span>Current Score</span>
          <span className="font-bold text-cyan-300">
            0
          </span>
        </div>

        <div className="rounded-2xl bg-slate-950 p-4">
          <h4 className="mb-3 font-semibold text-slate-100">
            Scoring Rules
          </h4>

          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <span>✅ Correct Answer</span>
              <span className="text-green-400">
                +100
              </span>
            </div>

            <div className="flex justify-between">
              <span>⚠ Hint Used</span>
              <span className="text-yellow-400">
                -20
              </span>
            </div>

            <div className="flex justify-between">
              <span>❌ Wrong Answer</span>
              <span className="text-red-400">
                -10
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-3">
          <span>Hints Used</span>
          <span className="font-semibold text-slate-100">
            0
          </span>
        </div>
      </div>
    </div>
  );
}