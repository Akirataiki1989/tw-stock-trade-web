import { afterEach, describe, expect, it, vi } from "vitest";
import { apiGet, ApiError } from "./api-client";

describe("apiGet", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends a Bearer authorization header and returns parsed JSON", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ hello: "world" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await apiGet<{ hello: string }>("/portfolio", "test-token");

    expect(result).toEqual({ hello: "world" });
    const [url, options] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/portfolio");
    expect(options.headers.Authorization).toBe("Bearer test-token");
  });

  it("throws ApiError with the response status when the response is not ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(apiGet("/portfolio", "test-token")).rejects.toMatchObject({
      status: 404,
    });
    await expect(apiGet("/portfolio", "test-token")).rejects.toBeInstanceOf(ApiError);
  });
});
