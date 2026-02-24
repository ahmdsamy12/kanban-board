import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import type { CreateTaskDto, ColumnId, Priority } from "@/types";
import { useCreateTask, useUpdateTask, useTasks } from "@/hooks/useTasks";
import { useUIStore } from "@/store/uiStore";
import { COLUMNS } from "@/utils/constants";

const PRIORITIES: Priority[] = ["low", "medium", "high"];

interface FormValues {
  title: string;
  description: string;
  column: ColumnId;
  priority: Priority;
}

export function TaskModal() {
  const {
    isCreateModalOpen,
    createModalColumn,
    closeCreateModal,
    selectedTaskId,
    setSelectedTaskId,
  } = useUIStore();

  const { data: tasks } = useTasks();
  const editTask = selectedTaskId
    ? tasks?.find((t) => t.id === selectedTaskId)
    : null;

  const isOpen = isCreateModalOpen || !!selectedTaskId;
  const isEdit = !!editTask;

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      column: (createModalColumn as ColumnId) ?? "backlog",
      priority: "medium",
    },
  });

  useEffect(() => {
    if (editTask) {
      reset({
        title: editTask.title,
        description: editTask.description,
        column: editTask.column,
        priority: editTask.priority,
      });
    } else {
      reset({
        title: "",
        description: "",
        column: (createModalColumn as ColumnId) ?? "backlog",
        priority: "medium",
      });
    }
  }, [editTask, createModalColumn, reset]);

  const onClose = () => {
    closeCreateModal();
    setSelectedTaskId(null);
  };

  const onSubmit = async (values: FormValues) => {
    if (isEdit && editTask) {
      await updateTask.mutateAsync({ id: editTask.id, ...values });
    } else {
      await createTask.mutateAsync(values as CreateTaskDto);
    }
    onClose();
  };

  const isPending = createTask.isPending || updateTask.isPending;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="span">
          {isEdit ? "Edit Task" : "Create Task"}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2.5}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  autoFocus
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                />
              )}
            />

            <Stack direction="row" spacing={2}>
              <Controller
                name="column"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Column"
                    select
                    fullWidth
                    size="small"
                  >
                    {COLUMNS.map((col) => (
                      <MenuItem key={col.id} value={col.id}>
                        {col.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Priority"
                    select
                    fullWidth
                    size="small"
                  >
                    {PRIORITIES.map((p) => (
                      <MenuItem
                        key={p}
                        value={p}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {p}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant="outlined" onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? "Saving…" : isEdit ? "Save Changes" : "Create Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
