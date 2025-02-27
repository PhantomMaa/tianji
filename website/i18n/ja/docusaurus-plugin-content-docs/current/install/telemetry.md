---
sidebar_position: 99
_i18n_hash: 9fa3e7353cb78796a908a1d850e9c68d
---
# テレメトリ

## 匿名テレメトリについて  

ユーザー体験を向上させるために、自己ホスト型のTianjiサービスでは**匿名テレメトリがデフォルトで有効**になっています。  

データプライバシーが重要であることを理解していますので、このテレメトリには以下の特徴があります:  

- **完全に匿名**: 個人を特定できる情報やサービスコンテンツは収集しません。  
- **極めて限定的な範囲**: 基本的な使用データのみを含んでおり、Tianjiの使用状況を最小限理解し、製品の継続的な改善に役立ちます。  
- **完全な透明性**: すべてのテレメトリデータの送信は、サービスのネットワークパネルで観察でき、完全な透明性が確保されています。  

さらに、皆様の選択を完全に尊重します。もし**匿名テレメトリを完全に無効にしたい**場合は、以下の環境変数を設定してください:  

```bash
DISABLE_ANONYMOUS_TELEMETRY=1
```

詳細な設定手順については、環境変数のドキュメントをご覧ください。

このアプローチにより、プライバシーとセキュリティを確保しつつ、Tianjiを改善することを目指しています。質問やフィードバックがある場合は、お気軽にお問い合わせください！
