# import pandas as pd

# REQUIRED_COLUMNS = [
#     "transaction_id",
#     "sender_id",
#     "receiver_id",
#     "amount",
#     "timestamp"
# ]

# def validate_csv(file):

#     try:
#         df = pd.read_csv(file)

#     except Exception as e:
#         raise ValueError(f"Invalid CSV file: {str(e)}")

#     # Check required columns
#     if list(df.columns) != REQUIRED_COLUMNS:
#         raise ValueError(
#             f"CSV must contain EXACT columns in this order: {REQUIRED_COLUMNS}"
#         )

#     # Convert timestamp
#     try:
#         df["timestamp"] = pd.to_datetime(
#             df["timestamp"],
#             format="%Y-%m-%d %H:%M:%S"
#         )
#     except:
#         raise ValueError(
#             "Timestamp must be in format: YYYY-MM-DD HH:MM:SS"
#         )

#     # Ensure amount is numeric
#     df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

#     if df["amount"].isnull().any():
#         raise ValueError("Invalid amount values detected")

#     return df


import pandas as pd

REQUIRED_COLUMNS = [
    "transaction_id",
    "sender_id",
    "receiver_id",
    "amount",
    "timestamp"
]

def validate_csv(file):
    try:
        df = pd.read_csv(file)
    except Exception as e:
        raise ValueError(f"Invalid CSV file: {str(e)}")

    if list(df.columns) != REQUIRED_COLUMNS:
        raise ValueError(
            f"CSV must contain EXACT columns in this order: {REQUIRED_COLUMNS}"
        )

    # UPDATED: Let Pandas intelligently parse mixed date formats (European/US/Missing Seconds)
    try:
        df["timestamp"] = pd.to_datetime(
            df["timestamp"],
            format='mixed',
            dayfirst=True # Prioritizes DD-MM-YYYY if ambiguous
        )
    except Exception as e:
        raise ValueError(f"Timestamp parsing failed: {str(e)}")

    df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

    if df["amount"].isnull().any():
        raise ValueError("Invalid amount values detected")

    return df