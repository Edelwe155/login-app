import { Box, Typography, OutlinedInput, FormHelperText } from "@mui/material";

export const inputSx = {
  backgroundColor: "#f0f0f0",
  borderRadius: 4,
  width: "100%",
  fontSize: 20,
  "&:focus-within": {
    borderColor: "primary.main",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderWidth: 0,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderWidth: 1,
  },
  "& input::placeholder": {
    fontSize: 20,
  },
};

interface CustomInputProps {
  label: string;
  disabled: boolean;
  id: "email" | "reEmail" | "password";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  helperText: string | false | undefined;
}

export const CustomInput = ({
  label,
  disabled,
  id,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: CustomInputProps) => {
  return (
    <Box position="relative" sx={{ marginBottom: 5 }}>
      <Typography sx={{ fontSize: 20, marginBottom: 1 }}>{label}</Typography>
      <OutlinedInput
        disabled={disabled}
        value={value}
        id={id}
        type={id}
        placeholder={
          id !== "reEmail"
            ? `Type in your ${label.toLowerCase()}`
            : "Re-enter your email"
        }
        onChange={onChange}
        onBlur={onBlur}
        sx={{
          ...inputSx,
          ...(error && {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
              borderColor: "#D62F39",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderWidth: 1,
              borderColor: "#D62F39",
            },
          }),
        }}
      />
      <FormHelperText
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          color: "#D62F39",
          fontSize: 14,
        }}
      >
        {helperText && helperText}
      </FormHelperText>
    </Box>
  );
};
