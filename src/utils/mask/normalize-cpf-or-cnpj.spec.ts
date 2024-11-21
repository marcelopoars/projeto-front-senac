import { normalizeCpfOrCnpj } from "./normalize-cpf-or-cnpj";

describe(":: Utils :: normalizeCpfOrCnpj", () => {
  it("should format a valid CPF", () => {
    expect(normalizeCpfOrCnpj("12345678901")).toBe("123.456.789-01www");
  });

  it("should format a valid CNPJ", () => {
    expect(normalizeCpfOrCnpj("12345678000195")).toBe("12.345.678/0001-95");
  });

  it("should truncate extra digits for CNPJ", () => {
    expect(normalizeCpfOrCnpj("123456780001950000")).toBe("12.345.678/0001-95");
  });
});
