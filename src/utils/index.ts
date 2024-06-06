import { useState } from "react";

// 定义函数类型
type TApiFun<TData, TParams extends Array<any>> = (
  ...params: TParams
) => Promise<TData>;

// 定义接口
interface AutoRequestOptions {
  loading?: boolean;
  onSuccess?: (data: any) => void;
}

// 定义hook返回值类型
type AutoRequestResult<TData, TParams extends any[] = any[]> = [
  boolean,
  TApiFun<TData, TParams>
];

export function useAutoRequest<TData, TParams extends any[] = any[]>(
  fun: TApiFun<TData, TParams>,
  options?: AutoRequestOptions
): AutoRequestResult<TData, TParams> {
  const { loading: initialLoading = false, onSuccess } = options || {};

  // 使用useState定义loading状态
  const [loading, setLoading] = useState<boolean>(initialLoading);

  // 定义请求函数
  const run: TApiFun<TData, TParams> = (...params) => {
    setLoading(true);
    return fun(...params)
      .then((res) => {
        onSuccess && onSuccess(res);
        return res;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 返回loading状态和请求函数
  return [loading, run];
}
