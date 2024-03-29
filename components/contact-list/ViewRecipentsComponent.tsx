import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';

interface Recipent {
  id: number;
  name: string;
  recipient: string;
  created_at: Date;
  user_id: string | null;
}

interface ViewRecipentsProps {
  recipients: Recipent[];
}

export const ViewRecipentsComponent: React.FC<ViewRecipentsProps> = ({
  recipients,
}) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[75px]'>Name</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipients.map((recipient, i) => (
            <TableRow key={i}>
              <TableCell className='font-medium'>{recipient.name}</TableCell>
              <TableCell>{recipient.recipient}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
