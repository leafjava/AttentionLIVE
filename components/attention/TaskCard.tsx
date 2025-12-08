'use client';

import { Card, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { User } from '@heroui/user';
import type { Task } from '@/types/attention';

interface TaskCardProps {
  task: Task;
  onJoinTask: (task: Task) => void;
}

export function TaskCard({ task, onJoinTask }: TaskCardProps) {
  const statusColor = {
    active: 'success',
    upcoming: 'warning',
    ended: 'default',
  }[task.status] as 'success' | 'warning' | 'default';

  const statusText = {
    active: '直播中',
    upcoming: '即将开始',
    ended: '已结束',
  }[task.status];

  return (
    <Card className="w-full">
      <CardBody className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
            <User
              name={task.streamerName}
              description="主播"
              avatarProps={{ size: 'sm' }}
            />
          </div>
          <Chip color={statusColor} variant="flat" size="sm">
            {statusText}
          </Chip>
        </div>

        <div className="space-y-2 text-sm text-default-500">
          <div className="flex justify-between">
            <span>奖励积分</span>
            <span className="text-warning font-semibold">+{task.reward} 积分</span>
          </div>
          <div className="flex justify-between">
            <span>参与人数</span>
            <span>{task.participantCount} 人</span>
          </div>
        </div>
      </CardBody>

      <CardFooter className="pt-0 px-4 pb-4">
        <Button
          color="primary"
          className="w-full"
          isDisabled={task.status !== 'active'}
          onPress={() => onJoinTask(task)}
        >
          {task.status === 'active' ? '跳转至币安直播' : '暂未开始'}
        </Button>
      </CardFooter>
    </Card>
  );
}
