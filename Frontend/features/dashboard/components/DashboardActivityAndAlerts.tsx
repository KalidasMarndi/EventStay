import React from "react";
import { DashboardActivity, DashboardAlert } from "@/services/dashboardApi";
import { AlertCircle, AlertTriangle, Info, CreditCard, CalendarCheck } from "lucide-react";

interface DashboardActivityAndAlertsProps {
  activity: DashboardActivity[];
  alerts: DashboardAlert[];
}

export function DashboardActivityAndAlerts({ activity, alerts }: DashboardActivityAndAlertsProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Activity Feed */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-display text-white mb-6">Recent Activity</h3>
        {activity.length === 0 ? (
          <p className="text-white/40 text-sm">No recent activity found.</p>
        ) : (
          <div className="space-y-6">
            {activity.map((act) => (
              <div key={act.id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  {act.type === 'PAYMENT' ? (
                    <CreditCard className="w-4 h-4 text-white" />
                  ) : (
                    <CalendarCheck className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">{act.title}</h4>
                  <p className="text-white/60 text-sm mt-1">{act.description}</p>
                  <span className="text-xs text-white/40 mt-2 block">
                    {new Date(act.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alerts */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-display text-white mb-6">Needs Attention</h3>
        {alerts.length === 0 ? (
          <p className="text-white/40 text-sm">All operations are running smoothly.</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border flex gap-3 ${
                  alert.type === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                  alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/10 border-blue-500/20 text-blue-400'
                }`}
              >
                {alert.type === 'critical' ? (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                ) : alert.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                ) : (
                  <Info className="w-5 h-5 shrink-0" />
                )}
                <span className="text-sm">{alert.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
