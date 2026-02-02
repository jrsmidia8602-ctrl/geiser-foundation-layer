import { AppLayout } from '@/components/layout/AppLayout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LogEntry {
  time: string;
  agent: string;
  action: string;
  status: string;
}

export default function LogsPage() {
  const logs: LogEntry[] = [
    {
      time: new Date().toLocaleTimeString(),
      agent: 'Alpha',
      action: 'Replicate',
      status: 'Success'
    },
    {
      time: new Date(Date.now() - 60000).toLocaleTimeString(),
      agent: 'Beta',
      action: 'Pause',
      status: 'Success'
    }
  ];

  return (
    <AppLayout title="Logs">
      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Agent activity history</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No logs available
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.time}</TableCell>
                    <TableCell>{log.agent}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
