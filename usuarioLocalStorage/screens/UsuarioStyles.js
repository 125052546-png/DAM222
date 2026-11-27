import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
  },
  title: {
    color: "#172554",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 15,
    marginBottom: 22,
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 20,
    gap: 10,
  },
  label: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  input: {
    borderColor: "#cbd5e1",
    borderRadius: 8,
    borderWidth: 1,
    color: "#0f172a",
    fontSize: 16,
    minHeight: 46,
    paddingHorizontal: 12,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 8,
    marginTop: 10,
    padding: 13,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.6,
  },
  error: {
    color: "#b91c1c",
    fontSize: 14,
    marginTop: 8,
  },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  cardTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  bodyText: {
    color: "#475569",
    fontSize: 15,
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: "#1e293b",
    fontWeight: "600",
  },
  dangerButton: {
    alignItems: "center",
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  dangerButtonText: {
    color: "#b91c1c",
    fontWeight: "600",
  },
  status: {
    color: "#475569",
    fontSize: 15,
    marginVertical: 12,
  },
});
