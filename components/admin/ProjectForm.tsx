"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import MDEditor from "@uiw/react-md-editor";
import ProjectImagesField from "@/components/admin/ProjectImagesField";
import { AREAS } from "@/lib/areas";
import * as ui from "@/components/admin/ui";

import { type Img, type ProjectFormValues } from "@/components/admin/projectFormValues";

export type FormResult = { error: string } | undefined;

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section style={ui.card}>
      <h2 className="display" style={ui.cardTitle}>{title}</h2>
      {hint && <p style={ui.cardHint}>{hint}</p>}
      {!hint && <div style={{ height: 18 }} />}
      {children}
    </section>
  );
}

function Field({ label, help, children }: { label: string; help?: string; children: React.ReactNode }) {
  return (
    <div style={ui.field}>
      <label style={ui.label}>{label}</label>
      {children}
      {help && <p style={ui.help}>{help}</p>}
    </div>
  );
}

export default function ProjectForm({
  initial,
  action,
  submitLabel,
  isNew = false,
}: {
  initial: ProjectFormValues;
  action: (formData: FormData) => Promise<FormResult | void>;
  submitLabel: string;
  isNew?: boolean;
}) {
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [areas, setAreas] = useState<string[]>(initial.areas);
  const [images, setImages] = useState<Img[]>(initial.images);
  const [contentMd, setContentMd] = useState(initial.content);
  const [audioContentMd, setAudioContentMd] = useState(initial.audioContent);

  const [state, formAction, pending] = useActionState(
    async (_prev: FormResult, fd: FormData): Promise<FormResult> => (await action(fd)) ?? undefined,
    undefined as FormResult
  );

  const audioOn = areas.includes("audio");
  const inp = { style: ui.input, className: "admin-input" };

  return (
    <form action={formAction}>
      {/* Hidden inputs carry state that isn't a plain form control */}
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="content" value={contentMd} />
      <input type="hidden" name="audioContent" value={audioContentMd} />

      <Section title="Basics">
        <div style={ui.grid2}>
          <Field label="Title">
            <input
              name="title"
              value={title}
              required
              {...inp}
              onChange={(e) => {
                const t = e.target.value;
                setTitle(t);
                if (!slugTouched) setSlug(t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
              }}
            />
          </Field>
          <Field label="Slug" help="The end of the page's web address.">
            <input
              name="slug"
              value={slug}
              required
              {...inp}
              onChange={(e) => { setSlugTouched(true); setSlug(e.target.value); }}
            />
          </Field>
        </div>

        <fieldset style={{ border: "none", padding: 0, margin: "0 0 20px" }}>
          <legend style={ui.label}>Areas</legend>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px" }}>
            {AREAS.map((a) => (
              <label key={a.value} style={ui.checkRow}>
                <input
                  type="checkbox"
                  name="areas"
                  value={a.value}
                  checked={areas.includes(a.value)}
                  onChange={(e) =>
                    setAreas((prev) => (e.target.checked ? [...prev, a.value] : prev.filter((v) => v !== a.value)))
                  }
                />
                {a.label}
              </label>
            ))}
          </div>
          <p style={ui.help}>Areas become filters on /projects. Ticking Audio also lists the project on the Sharkbomb Audio side and opens the audio description below.</p>
        </fieldset>

        <div style={ui.grid2}>
          <Field label="Role"><input name="role" defaultValue={initial.role} placeholder="Designer and builder" {...inp} /></Field>
          <Field label="Year"><input name="year" defaultValue={initial.year} placeholder="2024" {...inp} /></Field>
        </div>
        <Field label="Context"><input name="context" defaultValue={initial.context} placeholder="PRS Guitars, UVA ECE course, client commission" {...inp} /></Field>
        <Field label="Tags" help="Comma-separated.">
          <input name="tech" defaultValue={initial.tech.join(", ")} placeholder="Analog, PCB, Through-hole" {...inp} />
        </Field>
      </Section>

      <Section
        title="Portfolio description"
        hint="Technical brief. Shown on the All Work side, and on the audio side too until you write an audio version."
      >
        <Field label="Summary">
          <textarea name="summary" defaultValue={initial.summary} rows={3} spellCheck style={ui.textarea} className="admin-input" />
        </Field>
        <Field label="Highlights" help="One per line: outcomes and metrics. Shown on both sides.">
          <textarea name="highlights" defaultValue={initial.highlights.join("\n")} rows={4} placeholder={"Reduced noise floor by 12 dB\nShipped 30 units"} spellCheck style={ui.textarea} className="admin-input" />
        </Field>
        <Field label="Write-up">
          <div data-color-mode="light">
            <MDEditor value={contentMd} onChange={(v) => setContentMd(v ?? "")} height={420} textareaProps={{ spellCheck: true }} />
          </div>
        </Field>
      </Section>

      {/* Stays in the DOM when hidden so saved audio copy is never dropped */}
      <div hidden={!audioOn}>
        <Section
          title="Audio description"
          hint="Product brief for the Sharkbomb Audio side. Leave a field empty to use the portfolio version instead."
        >
          <Field label="Audio summary">
            <textarea name="audioSummary" defaultValue={initial.audioSummary} rows={3} placeholder="What it does, how it sounds, who it's for" spellCheck style={ui.textarea} className="admin-input" />
          </Field>
          <Field label="Audio write-up">
            <div data-color-mode="light">
              <MDEditor value={audioContentMd} onChange={(v) => setAudioContentMd(v ?? "")} height={320} textareaProps={{ spellCheck: true }} />
            </div>
          </Field>
        </Section>
      </div>

      <Section title="Photos and links">
        <Field label="Gallery images">
          <ProjectImagesField value={images} onChange={setImages} />
        </Field>
        <Field label="Cover image URL" help="Only used when there are no gallery images.">
          <input name="coverImage" defaultValue={initial.coverImage} placeholder="https://..." {...inp} />
        </Field>
        <div style={ui.grid2}>
          <Field label="Demo video URL (YouTube)"><input name="demoUrl" defaultValue={initial.demoUrl} placeholder="https://youtube.com/watch?v=..." {...inp} /></Field>
          <Field label="Source URL"><input name="repoUrl" defaultValue={initial.repoUrl} placeholder="https://github.com/..." {...inp} /></Field>
        </div>
      </Section>

      <Section title="Sale and placement">
        <label style={{ ...ui.checkRow, marginBottom: 16 }}>
          <input type="checkbox" name="isProduct" value="true" defaultChecked={initial.isProduct} />
          <span style={{ fontWeight: 600 }}>List as a product</span>
        </label>
        <div style={ui.grid2}>
          <Field label="Price"><input name="price" defaultValue={initial.price} placeholder="$249" {...inp} /></Field>
          <Field label="Shop URL (Reverb)"><input name="shopUrl" defaultValue={initial.shopUrl} placeholder="https://reverb.com/item/..." {...inp} /></Field>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 28px", marginBottom: 20 }}>
          <label style={ui.checkRow}>
            <input type="checkbox" name="featured" value="true" defaultChecked={initial.featured} />
            Feature on home page
          </label>
          <label style={ui.checkRow}>
            Order
            <input name="featuredOrder" type="number" min={1} defaultValue={initial.featuredOrder} placeholder="1" style={{ ...ui.input, width: 72 }} className="admin-input" />
          </label>
          <label style={ui.checkRow}>
            <input type="checkbox" name="audioFeatured" value="true" defaultChecked={initial.audioFeatured} />
            Feature on Sharkbomb Audio page
          </label>
        </div>
      </Section>

      {state?.error && (
        <p role="alert" style={{ color: "#9b2c2c", fontSize: 15, margin: "0 0 16px" }}>{state.error}</p>
      )}

      <div style={{ position: "sticky", bottom: 0, background: "var(--paper)", borderTop: "1px solid var(--rule)", padding: "14px 0", display: "flex", gap: 12 }}>
        <button type="submit" disabled={pending} style={ui.btnPrimary} className="admin-btn">
          {pending ? "Saving..." : submitLabel}
        </button>
        <Link href="/admin" style={ui.btnGhost} className="admin-btn">Cancel</Link>
      </div>
    </form>
  );
}
