'use client';

import { useState, useEffect } from 'react';
import { Spinner } from '@heroui/spinner';
import { TaskCard } from '@/components/attention/TaskCard';
import { VerificationModal } from '@/components/attention/VerificationModal';
import { SuccessAnimation } from '@/components/attention/SuccessAnimation';
import { getTasks } from '@/lib/api/attention';
import type { Task } from '@/types/attention';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  
  // 模拟用户ID，实际应从认证系统获取
  const userId = 'user-123';

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTask = (task: Task) => {
    // 打开币安直播
    window.open(task.streamUrl, '_blank');
    // 显示验证码输入模态框
    setSelectedTask(task);
  };

  const handleVerificationSuccess = (points: number) => {
    setEarnedPoints(points);
    setShowSuccess(true);
    loadTasks(); // 刷新任务列表
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">直播任务</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onJoinTask={handleJoinTask} />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 text-default-500">
          暂无可用任务
        </div>
      )}

      {selectedTask && (
        <VerificationModal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
          userId={userId}
          onSuccess={handleVerificationSuccess}
        />
      )}

      <SuccessAnimation
        isVisible={showSuccess}
        points={earnedPoints}
        onComplete={() => setShowSuccess(false)}
      />
    </div>
  );
}
