import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye, ArrowUpDown, Filter, Search, User, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Task {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  primaryParty: string;
  priority: string;
  dueDate: string;
  priorityClass: string;
  type: string;
}

interface TasksJiraViewProps {
  tasks: Task[];
  onViewTask?: (taskId: string) => void;
  onSortByDate?: () => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getPriorityLevel = (priority: string) => {
  switch (priority) {
    case 'Critical Alert':
      return { level: 'Highest', color: 'bg-red-100 text-red-800 border-red-300' };
    case 'Alert':
      return { level: 'High', color: 'bg-orange-100 text-orange-800 border-orange-300' };
    case 'High Priority':
      return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    case 'Normal':
      return { level: 'Low', color: 'bg-blue-100 text-blue-800 border-blue-300' };
    default:
      return { level: 'Normal', color: 'bg-gray-100 text-gray-800 border-gray-300' };
  }
};

export function TasksJiraView({ tasks, onViewTask, onSortByDate }: TasksJiraViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery === "" || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.primaryParty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Tasks & Alerts - Enhanced List View</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tasks, cases, or parties..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="Critical Alert">Critical</SelectItem>
                  <SelectItem value="Alert">Alert</SelectItem>
                  <SelectItem value="High Priority">High</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[100px]">Key</TableHead>
                  <TableHead className="w-[250px]">Summary</TableHead>
                  <TableHead className="w-[150px]">Assignee</TableHead>
                  <TableHead className="w-[120px]">Priority</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[120px]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={onSortByDate}
                      className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                    >
                      Due Date
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => {
                  const priorityInfo = getPriorityLevel(task.priority);
                  return (
                    <TableRow key={task.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">
                          {task.caseNumber}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {task.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{task.primaryParty}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`text-xs font-medium px-2.5 py-1 ${priorityInfo.color}`}
                        >
                          {priorityInfo.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{formatDate(task.dueDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onViewTask?.(task.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}