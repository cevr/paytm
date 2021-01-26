import * as React from "react";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import { useStore } from "../store";
import { Receipt } from "../types";
import { useExchanges } from "../api";

const receiptFormStyles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
      gap: `${theme.spacing(2)}px`,
    },
  });

const useReceiptFormStyles = makeStyles(receiptFormStyles);

interface ReceiptFormProps {
  receipt: Receipt;
  index: number;
}

function ReceiptForm({ receipt, index }: ReceiptFormProps) {
  const styles = useReceiptFormStyles();
  const { data } = useExchanges();
  const userCurrency = useStore((state) => state.currency);
  const updateReceipt = useStore((state) => state.updateReceipt);
  if (!data?.rates) {
    return (
      <Paper className={styles.root}>
        <CircularProgress size={35} />
      </Paper>
    );
  }
  return (
    <Paper className={styles.root}>
      <Typography variant="h6">Receipt #{index + 1}</Typography>
      <Typography variant="h6">${receipt.amountCAD.toFixed(2)} CAD</Typography>
      <TextField
        label="Amount"
        value={receipt.amount ?? 0}
        type="number"
        onChange={(event) => {
          const amount = event.target.value;
          updateReceipt(receipt.id, {
            amount,
            amountCAD:
              receipt.currency !== "CAD"
                ? ((parseFloat(amount) *
                    data?.rates[receipt.currency]) as number)
                : // here we ensure that there will always be an amount to parse
                  parseFloat(amount || "0"),
          });
        }}
      />
      <FormControl>
        <InputLabel id="receipt-currency">Currency</InputLabel>
        <Select
          labelId="receipt-currency"
          id="receipt-currency-select"
          value={receipt.currency ?? userCurrency}
          onChange={(event) => {
            const currency = event.target.value as string;
            updateReceipt(receipt.id, {
              currency,
              amountCAD:
                currency !== "CAD"
                  ? ((parseFloat(receipt.amount) /
                      data?.rates[currency]) as number)
                  : receipt.amountCAD,
            });
          }}
        >
          {Object.keys(data?.rates ?? {}).map((rate) => (
            <MenuItem value={rate} key={rate}>
              {rate}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Description"
        multiline
        value={receipt.description}
        onChange={(event) => {
          const description = event.target.value;
          updateReceipt(receipt.id, {
            description,
          });
        }}
      />
    </Paper>
  );
}
export default ReceiptForm;
