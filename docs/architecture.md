# error-handler-ts アーキテクチャ・設計ドキュメント

> 対象バージョン: `@yk-takemoto/error-handler` 0.1.0（2026-07 時点の `org/error-handler-ts` ソース解析に基づく）

## 1. 概要

TypeScript 用の極小エラーハンドリングライブラリ。任意の `unknown` エラーを、アプリ間共通のレスポンス形式
`CommonExceptionResponse` に正規化する **単一関数 `errorHandler()`** のみを提供する。

- 利用元: `smarthome-agent-mcp` / `kakeibo-agent` の webui API ルート・MCP サーバ・receipts_api など、ほぼ全レイヤ
- 配布形態: GitHub リポジトリ直参照（`github:yk-takemoto/error-handler-ts#0.0.1`）

## 2. 公開 API

| エクスポート | 種別 | 内容 |
| --- | --- | --- |
| `errorHandler(message, error?)` | 関数 | エラーを `CommonExceptionResponse` に変換 |
| `CommonExceptionResponse` | 型 | `{ message: string; error?: { name; message; stack? } }` |

## 3. 設計思想・ポリシー

- **Zod スキーマファースト**: レスポンス形状は `commonExceptionResponseSchema`（zod）で定義し、`z.infer` で型を導出。返却直前にも `parse()` して実行時保証する。
- **エラー種別の吸収**: `Error` インスタンス / `string` / `object` / その他を判別し、`name` に `string_error` / `object_error` / `unknown_error` を割り当てて情報欠落を防ぐ。
- **例外を投げない**: 常に構造化オブジェクトを返し、呼び出し側が HTTP レスポンス化・throw の判断を行う。

## 4. ファイル構成

```text
src/
├── index.ts           # 公開エクスポート
├── error_handler.ts   # errorHandler 本体
└── error_schemas.ts   # zod スキーマ + 型
```

ビルドは `tsc` + `rollup`（CJS/ESM/UMD の3形態バンドル）+ `tsc-alias`。

## 5. 既知の課題（リアーキ観点）

- `stack` をそのままレスポンスに含めるため、**webui API ルート経由でクライアントへスタックトレースが露出**する（情報漏えいリスク）。本番ではマスクすべき。
- エラー分類・エラーコード・HTTP ステータスの概念がなく、呼び出し側が文字列 `message` を組み立てる規約（`"[Class#method] ..."`）が暗黙的。
- 単機能ライブラリを GitHub 参照の独立パッケージとして配布しており、バージョン管理・ビルド設定（rollup/eslint/tsconfig 一式）のオーバーヘッドが本体コード（約50行）に対して過大。
- モノレポ化の際は共通 `core`（エラー + 共通スキーマ + Result 型）への統合が妥当。
